import React from 'react'
import { Link } from 'react-router-dom'
import PostsLoader from './PostsLoader'
import UsersLoader from './UsersLoader'

export default function SideBar() {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
        <PostsLoader />
      </li>
      <li>
        <Link to="/users">Users</Link>
        <UsersLoader />
      </li>
    </ul>
  )
}
