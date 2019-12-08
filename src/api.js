import { useEffect } from 'react'
import pSCFetch, { subscribe, unsubscribe } from 'psc-fetch'

export const API_HOST = 'jsonplaceholder.typicode.com'

export const useFetchApiSubscription = callbacks =>
  _buildSubscription({ hostMatcher: API_HOST, callbacks })

export function fetchPost(postId) {
  return getFromPlaceholder(`/posts/${postId}`)
}
export const useFetchPostSubscription = callbacks =>
  _buildSubscription({
    hostMatcher: API_HOST,
    pathnameMatcher: /posts\/\d/,
    callbacks
  })

export function fetchPosts() {
  return getFromPlaceholder(`/posts`)
}
export const useFetchPostsSubscription = callbacks => {
  _buildSubscription({
    hostMatcher: API_HOST,
    pathnameMatcher: /posts/,
    callbacks
  })
}

export function fetchUser(userId) {
  return getFromPlaceholder(`/users/${userId}`)
}
export const useFetchUserSubscription = callbacks =>
  _buildSubscription({
    hostMatcher: API_HOST,
    pathnameMatcher: /users\/\d/,
    callbacks
  })

export function fetchUsers() {
  return getFromPlaceholder(`/users`)
}
export const useFetchUsersSubscription = callbacks =>
  _buildSubscription({
    hostMatcher: API_HOST,
    pathnameMatcher: /users/,
    callbacks
  })

async function getFromPlaceholder(pathname) {
  const response = await pSCFetch(`https://${API_HOST}${pathname}`, {
    expiry: 6000
  })

  if (response.status !== 200) {
    throw new Error('Error ' + response.status)
  }
  return response.json()
}

const _buildSubscription = ({ hostMatcher, pathnameMatcher, callbacks }) => {
  useEffect(() => {
    const token = subscribe({ hostMatcher, pathnameMatcher }, callbacks)
    return () => {
      unsubscribe(token, callbacks)
    }
  }, [])
}
