import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { useFetchPostsSubscription, useFetchUsersSubscription } from './api'

export default function SideBar() {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
        <Loader subscription={useFetchPostsSubscription} />
      </li>
      <li>
        <Link to="/users">Users</Link>
        <Loader subscription={useFetchUsersSubscription} />
      </li>
    </ul>
  )
}
