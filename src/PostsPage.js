import React, { useEffect, useState } from 'react'
import { fetchPosts } from './api'
import PostsLoader from './PostsLoader'

export default function PostsPage() {
  const [posts, setPosts] = useState([])

  const fetchAndSetPosts = async () => {
    const res = await fetchPosts()
    setPosts(res)
  }

  useEffect(() => {
    fetchAndSetPosts()
  }, [])

  return (
    <div>
      <h2>Posts</h2>
      <div style={{ backgroundColor: '#00688B', width: '30%', margin: 'auto' }}>
        <PostsLoader />
        <button onClick={() => fetchAndSetPosts()}>Refresh</button>
      </div>

      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
