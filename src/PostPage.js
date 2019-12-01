import React, { useEffect, useState } from 'react'
import { fetchPost } from './api'

export default function PostPage() {
  const [title, setTitle] = useState('loading')

  const fetchAndSetTitle = async refresh => {
    const params = refresh ? '1?abc=123' : '1'
    const res = await fetchPost(params)

    setTitle(res.title)
  }

  useEffect(() => {
    fetchAndSetTitle()
  }, [])

  return (
    <div>
      <h1>Post: {title}</h1>
      <button onClick={() => fetchAndSetTitle(true)}>Refresh</button>
    </div>
  )
}
