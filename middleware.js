// middleware.js
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/config.js'

const publicFile = /\.(.*)$/
const excludeFile = ['logo.svg']

// 获取客户端语言
const getLocale = request => {
  const headers = {
    'accept-language': request.headers.get('accept-language') || ''
  }

  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

// 使用 NextResponse.rewrite 来重写请求路径而不改变客户端 URL
// 使用 NextResponse.redirect 来执行客户端重定向。
export function middleware (request) {
  const { pathname } = request.nextUrl

  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 如果是 public 文件，不重定向
  if (
    publicFile.test(pathname) && // 静态资源
    excludeFile.indexOf(pathname.substr(1)) == -1 // 白名单
  )
    return

  // 获取匹配的 locale
  const locale = getLocale(request)

  request.nextUrl.pathname = `/${locale}${pathname}`

  // 默认语言不重定向
  if (locale === defaultLocale) {
    return NextResponse.rewrite(request.nextUrl)
  }

  // 重定向，如 /products 重定向到 /en/products
  return NextResponse.redirect(request.nextUrl)
}

// 为了让中间件生效，需要在 next.config.js 中配置
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
