// middleware.js
import { auth } from 'auth'

// 为了让中间件生效，需要在 next.config.js 中配置
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
