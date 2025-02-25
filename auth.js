import NextAuth from 'next-auth' // 功能：登录
import Github from 'next-auth/providers/github' // 功能：Github 登录
import CredentialsProvider from 'next-auth/providers/credentials' // 功能：用户名密码登录
// import { addUser, getUser } from '@/lib/redis' // 功能：添加用户、获取用户
import { addUser, getUser } from '@/lib/prisma' // 功能：添加用户、获取用户

export const {
  handlers, // 功能：获取用户信息
  auth, // 功能：登录
  signIn, // 功能：登录
  signOut // 功能：登出
} = NextAuth({
  providers: [
    CredentialsProvider({
      // 显示按钮文案 (e.g. "Sign in with...")
      name: '密码登录',
      // `credentials` 用于渲染登录页面表单
      credentials: {
        username: { label: '账号', type: 'text', placeholder: '输入您的账号' },
        password: { label: '密码', type: 'password', placeholder: '请输入密码' }
      },
      // 处理从用户收到的认证信息
      async authorize (credentials) {
        // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
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
    },
    async jwt ({ token, user, account }) {
      if (account && account.type === 'credentials' && user) {
        token.userId = user.userId
      }
      return token
    },
    async session ({ session, token }) {
      session.user.userId = token.userId
      return session
    }
  }
})
