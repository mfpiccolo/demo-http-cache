import React, { useState } from 'react'
import { useFetchUsersSubscription } from './api'
import Loader from './Loader'

export default function HeaderLoader() {
  const [loading, setLoading] = useState(false)

  useFetchUsersSubscription({
    loading: () => setLoading(true),
    success: () => setLoading(false),
    error: () => alert('error')
  })

  return <Loader loading={loading} />
}
