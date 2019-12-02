import React, { useEffect, useState } from 'react'
import { fetchPost, useFetchPostSubscription } from './api'
import Loader from './Loader'

export default function PostPage({
  match: {
    params: { id }
  }
}) {
  const [post, setPost] = useState({})

  const fetchAndSetPost = async () => {
    const res = await fetchPost(id)
    setPost(res)
  }

  useEffect(() => {
    fetchAndSetPost()
  }, [id])

  return (
    <div>
      <div style={{ backgroundColor: '#00688B', width: '30%', margin: 'auto' }}>
        <Loader subscription={useFetchPostSubscription} />
        <button onClick={() => fetchAndSetPost()}>Refresh</button>
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
