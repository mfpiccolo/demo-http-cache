import { useEffect } from 'react'
import cachePubSubFetch, { subscribe, unsubscribe } from './cachePubSubFetch'

export const API_HOST = 'jsonplaceholder.typicode.com'

export function fetchPost(postId) {
  return getFromPlaceholder(`/posts/${postId}`)
}

export const useFetchPostSubscription = callbacks =>
  useEffect(() => {
    const subscriptions = subscribe(
      {
        host: /typicode/,
        pathname: /posts\/\d/
      },
      callbacks
    )
    return () => {
      unsubscribe(subscriptions)
    }
  }, [])

export function fetchUser(userId) {
  return getFromPlaceholder(`/users/${userId}`)
}

async function getFromPlaceholder(pathname) {
  const response = await cachePubSubFetch(`https://${API_HOST}${pathname}`, {
    expiry: 5000
  })

  if (response.status !== 200) {
    throw new Error('Error ' + response.status)
  }
  return response.json()
}
