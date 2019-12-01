import React, { useState, useEffect } from 'react'
import { useFetchPostSubscription } from './api'
import Loader from './Loader'

export default function HeaderLoader() {
  const [loading, setLoading] = useState(false)

  useFetchPostSubscription({
    loading: () => setLoading(true),
    success: () => setLoading(false),
    error: () => alert('error')
  })

  return <Loader loading={loading} />
}
