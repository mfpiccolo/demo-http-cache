import React, { useEffect, useState } from 'react'
import pSCFetch, { subscribe, unsubscribe } from 'psc-fetch'

import { useFetchPostSubscription, API_HOST } from './api'
import Loader from './Loader'

export default function PostPage({
  match: {
    params: { id }
  }
}) {
  const [post, setPost] = useState({})

  useEffect(() => {
    const unsubscribeToken = subscribe(
      { hostMatcher: API_HOST, pathnameMatcher: /posts\/\d/ },
      { success: async ({ response }) => setPost(await response.json()) }
    )

    return () => {
      unsubscribe(unsubscribeToken)
    }
  }, [])

  useEffect(() => {
    pSCFetch(`https://${API_HOST}/posts/${id}`, {
      expiry: 6000
    })
  }, [id])

  return (
    <div>
      <div style={{ backgroundColor: '#00688B', width: '30%', margin: 'auto' }}>
        <Loader subscription={useFetchPostSubscription} />
        <button
          onClick={() =>
            pSCFetch(`https://${API_HOST}/posts/${id}`, { expiry: 6000 })
          }
        >
          Refresh
        </button>
      </div>

      {post && (
        <>
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </>
      )}
    </div>
  )
}
