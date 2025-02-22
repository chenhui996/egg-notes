'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

const ClientComponent = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  return <pre>{JSON.stringify(session, null, 2)}</pre>
}

export default ClientComponent
