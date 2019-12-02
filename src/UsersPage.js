import React, { useEffect, useState } from 'react'
import { fetchUsers, useFetchUsersSubscription } from './api'
import Loader from './Loader'

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

      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
