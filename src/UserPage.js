import React, { useEffect, useState } from 'react'
import pSCFetch, { subscribe, unsubscribe } from 'psc-fetch'

import { useFetchUserSubscription, API_HOST, EXPIRY } from './api'
import Loader from './Loader'

export default function UserPage({
  match: {
    params: { id }
  }
}) {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const response = pSCFetch(`https://${API_HOST}/users/${id}`, {
      expiry: EXPIRY
    })

    setUser(await (await response).json())
  }

  useEffect(() => {}, [id])

  return (
    <div>
      <div style={{ backgroundColor: '#00688B', width: '30%', margin: 'auto' }}>
        <Loader subscription={useFetchUserSubscription} />
        <button onClick={() => fetchUser()}>Refresh</button>
      </div>

      {user && (
        <>
          <h2>{user.name}</h2>
        </>
      )}
    </div>
  )
}
