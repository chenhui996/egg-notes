import React from 'react'
import { auth } from 'auth'
import { SessionProvider } from 'next-auth/react' // SessionProvider: 用于获取用户信息
import ClientComponent from '@/components/ClientComponent'

const ClientPage = async () => {
  const session = await auth()

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image
    }
  }

  return (
    <SessionProvider session={session}>
      <ClientComponent />
    </SessionProvider>
  )
}

export default ClientPage
