import React, { useEffect, useState } from 'react'
import { fetchPosts, useFetchPostsSubscription } from './api'
import Loader from './Loader'
import { Link } from 'react-router-dom'

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
        <button onClick={() => fetchAndSetPosts()}>Refresh</button>
      </div>

      {posts.map(({ id, title }) => (
        <div key={id}>
          <Link to={`/posts/${id}`}>{title}</Link>
        </div>
      ))}
    </div>
  )
}
