import React, { useEffect, useState } from 'react'
import { fetchPost } from './api'

export default function RepoPage() {
  const [title, setPost] = useState('loading')

  const fetchAndSetPost = async refresh => {
    const params = refresh ? '1?abc=123' : '1'
    const res = await fetchPost(params)

    setPost(res.title)
  }

  useEffect(() => {
    fetchAndSetPost()
  }, [])

  return (
    <div>
      <h1>Post: {title}</h1>
      <button onClick={() => fetchAndSetPost(true)}>Refresh</button>
    </div>
  )
}
