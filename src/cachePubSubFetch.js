import hash from 'object-hash'

// ------------------- Cache/fetch/publish ---------------------------
const cachePublishFetch = (url, opts) => {
  const { expiry, ...options } = opts

  // Use the URL as the cache key to sessionStorage
  const cacheKey = url
  const cached = localStorage.getItem(cacheKey)
  const whenCached = localStorage.getItem(cacheKey + ':ts')
  if (cached !== null && whenCached !== null) {
    const age = Date.now() - whenCached
    if (age < expiry) {
      const response = new Response(new Blob([cached]))
      return Promise.resolve(response)
    } else {
      localStorage.removeItem(cacheKey)
      localStorage.removeItem(cacheKey + ':ts')
    }
  }

  _matchAndDispatchEvents({ url, type: 'loading' })

  return fetch(url, options)
    .then(response => {
      if (response.status === 200) {
        _matchAndDispatchEvents({ url, type: 'success' })

        let ct = response.headers.get('Content-Type')
        if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
          response
            .clone()
            .text()
            .then(content => {
              localStorage.setItem(cacheKey, content)
              localStorage.setItem(cacheKey + ':ts', Date.now())
            })
        }
      }
      return response
    })
    .catch(error => {
      _matchAndDispatchEvents({ url, type: 'error' })
    })
}
export default cachePublishFetch

const _matchAndDispatchEvents = ({ url, type }) => {
  Object.entries(window.CPSF_SUBSCRIPTIONS).forEach(
    ([matcherHash, { hostMatcher, pathnameMatcher }]) => {
      const { host, pathname } = _parseURL(url)

      _isMatchUrl({ hostMatcher, pathnameMatcher }, { host, pathname }, () => {
        _dispatchEvent({ matcherHash, url, type })
      })
    }
  )
}

const _dispatchEvent = ({ matcherHash, url, type, error }) => {
  var event = new CustomEvent(matcherHash, {
    detail: { matcherHash, ..._parseURL(url), type, error }
  })
  window.dispatchEvent(event)
}

function _parseURL(url) {
  var parser = document.createElement('a'),
    searchObject = {},
    queries,
    split,
    i

  parser.href = url

  queries = parser.search.replace(/^\?/, '').split('&')
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=')
    searchObject[split[0]] = split[1]
  }
  return {
    url,
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash
  }
}

// ------------------- subscribe/unsubscribe ---------------------------

export const subscribe = (options, callbacks) => {
  if (!window.CPSF_SUBSCRIPTIONS) {
    window.CPSF_SUBSCRIPTIONS = {}
  }
  _addEventListener(options, callbacks)
}

export const unsubscribe = callbacks => {
  // return STATES.forEach(state => {
  //   window.removeEventListener(state, callbacks[state])
  // })
}

const _addEventListener = (
  { hostMatcher, pathnameMatcher, search },
  callbacks
) => {
  const matcherHash = hash({ hostMatcher, pathnameMatcher })

  window.CPSF_SUBSCRIPTIONS[matcherHash] = {
    hostMatcher,
    pathnameMatcher
  }

  return window.addEventListener(matcherHash, event => {
    const { type, host, pathname, search } = event.detail

    _isMatchUrl(
      { hostMatcher, pathnameMatcher },
      { host, pathname, search },
      () => callbacks[type](event)
    )
  })
}

const _isMatchUrl = (
  { hostMatcher, pathnameMatcher },
  { host, pathname, search },
  callback
) => {
  if (hostMatcher && pathnameMatcher && search) {
    // TODO special handling for search object
  } else if (hostMatcher && pathnameMatcher) {
    if (_isMatch(hostMatcher, host) && _isMatch(pathnameMatcher, pathname))
      callback()
  } else if (hostMatcher) {
    if (_isMatch(hostMatcher, host)) callback()
  } else {
  }
}

const _isMatch = (matcher, matchee) => {
  const isRegex = matcher instanceof RegExp
  const isString = typeof matcher === 'string'
  if (isRegex) {
    if (matcher.test(matchee)) return true
  } else if (isString) {
    if (matcher === matchee) return true
  }
}
