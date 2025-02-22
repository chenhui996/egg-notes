import NextAuth from 'next-auth' // 功能：登录
import Github from 'next-auth/providers/github' // 功能：Github 登录
import CredentialsProvider from 'next-auth/providers/credentials' // 功能：用户名密码登录
import { addUser, getUser } from '@/lib/redis' // 功能：添加用户、获取用户

export const {
  handlers, // 功能：获取用户信息
  auth, // 功能：登录
  signIn, // 功能：登录
  signOut // 功能：登出
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: '密码登录',
      credentials: {
        username: { label: '邮箱', type: 'text', placeholder: '请输入邮箱' },
        password: { label: '密码', type: 'password', placeholder: '请输入密码' }
      },
      async authorize (credentials) {
        // console.log('credentials', credentials);
        
        let user = null

        // 登录信息验证
        user = await getUser(credentials.username, credentials.password)

        // 密码错误
        if (user === 1) null

        // 用户注册
        if (user === 0) {
          user = await addUser(credentials.username, credentials.password)
        }

        if (!user) throw new Error('用户不存在')

        return user
      }
    }),
    Github({
      clientId: process.env.AUTH_GUTHUB_ID,
      clientSecret: process.env.AUTH_GUTHUB_SECRET
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    authorized ({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith('/note/edit')) return !!auth
      return true
    }
  }
})
