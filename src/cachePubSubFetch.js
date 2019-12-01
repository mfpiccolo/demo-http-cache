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

  _dispatchEvent('loading', cacheKey)

  return fetch(url, options)
    .then(response => {
      if (response.status === 200) {
        _dispatchEvent('success', cacheKey)

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
      _dispatchEvent('error', cacheKey, error)
    })
}
export default cachePublishFetch

const _dispatchEvent = (type, cacheKey, error) => {
  var event = new CustomEvent(type, {
    detail: { ..._parseURL(cacheKey), error }
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
  return ['loading', 'success', 'error'].map(type =>
    _addEventListener({ type, ...options }, callbacks)
  )
}

export const unsubscribe = callbacks => {
  ;['loading', 'success', 'error'].forEach(state => {
    window.removeEventListener(state, callbacks[state])
  })
}

const _addEventListener = ({ type, host, pathname, search }, callbacks) => {
  return window.addEventListener(type, event => {
    const { host: eHost, pathname: ePathname, search: eSearch } = event.detail

    if (host && pathname && search) {
      // TODO special handling for search object
    } else if (host && pathname) {
      if (_isMatch(host, eHost) && _isMatch(pathname, ePathname))
        callbacks[type](event)
    } else if (host) {
      if (_isMatch(host, eHost)) callbacks[type](event)
    } else {
    }
  })
}

const _isMatch = (match, eMatch) => {
  const isRegex = match instanceof RegExp
  const isString = typeof match === 'string'
  if (isRegex) {
    if (match.test(eMatch)) return true
  } else if (isString) {
    if (match === eMatch) return true
  }
}
