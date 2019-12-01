import { useEffect } from 'react'
import cachePubSubFetch, { subscribe, unsubscribe } from './cachePubSubFetch'

export const API_HOST = 'jsonplaceholder.typicode.com'

export const useFetchApiSubscription = callbacks =>
  _buildSubscription({ host: API_HOST, callbacks })

export function fetchPost(postId) {
  return getFromPlaceholder(`/posts/${postId}`)
}
export const useFetchPostSubscription = callbacks =>
  _buildSubscription({ host: API_HOST, pathname: /posts\/\d/, callbacks })

export function fetchPosts() {
  return getFromPlaceholder(`/posts`)
}
export const useFetchPostsSubscription = callbacks =>
  _buildSubscription({ host: API_HOST, pathname: /posts/, callbacks })

export function fetchUser(userId) {
  return getFromPlaceholder(`/users/${userId}`)
}
export const useFetchUserSubscription = callbacks =>
  _buildSubscription({ host: API_HOST, pathname: /users\/\d/, callbacks })

export function fetchUsers() {
  return getFromPlaceholder(`/users`)
}
export const useFetchUsersSubscription = callbacks =>
  _buildSubscription({ host: API_HOST, pathname: /users/, callbacks })

async function getFromPlaceholder(pathname) {
  const response = await cachePubSubFetch(`https://${API_HOST}${pathname}`, {
    expiry: 5000
  })

  if (response.status !== 200) {
    throw new Error('Error ' + response.status)
  }
  return response.json()
}

const _buildSubscription = ({ host, pathname, callbacks }) => {
  useEffect(() => {
    const subscriptions = subscribe({ host, pathname }, callbacks)
    return () => {
      unsubscribe(subscriptions)
    }
  }, [host, pathname, callbacks])
}
