import React, { useEffect, useState } from 'react'
import { fetchPost } from './api'

export default function PostPage() {
  const [title, setPost] = useState('loading')

  const fetchAndSetPost = async () => {
    const res = await fetchPost()
    setPost(res.title)
  }

  useEffect(() => {
    fetchAndSetPost()
  }, [])

  return (
    <div>
      <h1>Post: {title}</h1>
      <button onClick={() => fetchAndSetPost()}>Refresh</button>
    </div>
  )
}
