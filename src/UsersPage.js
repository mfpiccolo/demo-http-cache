import React, { useEffect, useState } from 'react'
import { fetchUsers, fetchUser, useFetchUsersSubscription } from './api'
import Loader from './Loader'
import PreFetchHoverLink from './PreFetchHoverLink'

export default function UsersPage() {
  const [users, setUsers] = useState([])

  const fetchAndSetUsers = async () => {
    const res = await fetchUsers()
    setUsers(res)
  }

  useEffect(() => {
    fetchAndSetUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <div style={{ backgroundColor: '#00688B', width: '30%', margin: 'auto' }}>
        <Loader subscription={useFetchUsersSubscription} />
        <button onClick={() => fetchAndSetUsers()}>Refresh</button>
      </div>

      {users.map(({ id, name }) => (
        <div key={id}>
          <PreFetchHoverLink
            to={`/users/${id}`}
            onHover={() => fetchUser(id)}
            delay={65}
          >
            {name}
          </PreFetchHoverLink>
        </div>
      ))}
    </div>
  )
}
