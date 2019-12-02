import React, { useEffect, useState } from 'react'
import { fetchPosts, fetchPost, useFetchPostsSubscription } from './api'
import Loader from './Loader'
import PreFetchHoverLink from './PreFetchHoverLink'

export default function PostsPage() {
  const [posts, setPosts] = useState([])

  const fetchAndSetPosts = async () => {
    setPosts(await fetchPosts())
  }

  useEffect(() => {
    fetchAndSetPosts()
  }, [])

  return (
    <div>
      <h2>Posts</h2>
      <div style={{ backgroundColor: '#00688B', width: '30%', margin: 'auto' }}>
        <Loader subscription={useFetchPostsSubscription} />
        <button onMouseDown={() => fetchAndSetPosts()}>Refresh</button>
      </div>

      {posts.map(({ id, title }) => (
        <div key={id}>
          <PreFetchHoverLink
            to={`/posts/${id}`}
            onHover={() => fetchPost(id)}
            delay={65}
          >
            {title}
          </PreFetchHoverLink>
        </div>
      ))}
    </div>
  )
}
