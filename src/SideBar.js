import React from 'react'
import { Link } from 'react-router-dom'
import PostLoader from './PostsLoader'

export default function SideBar() {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
        <PostLoader />
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  )
}
