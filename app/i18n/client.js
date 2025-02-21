'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrg
} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector' //  i18next 国际化框架的一部分，用于检测浏览器语言
import resourcesToBackend from 'i18next-resources-to-backend'
import { locales, defaultLocale } from '@/config'
import { useCookies } from 'react-cookie'

export const cookieName = 'i18next'
const runsOnServerSide = typeof window === 'undefined' // 判断是否在服务端运行

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language, namespace) =>
      import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng: defaultLocale,
    fallbackNS: 'basic',
    defaultNS: 'basic',
    ns: 'basic',
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator']
    },
    preload: runsOnServerSide ? locales : []
  })

export function useTranslation (lng, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  if (
    runsOnServerSide && // 服务端
    lng && // 语言
    i18n.resolvedLanguage !== lng // 当前语言不等于传入的语言
  ) {
    i18n.changeLanguage(lng) // 切换语言
    return ret
  }

  const [activeLng, setActiveLng] = useState(
    i18n.resoledLanguage // 当前语言
  )

  useEffect(() => {
    if (activeLng !== i18n.resolvedLanguage) {
      setActiveLng(i18n.resolvedLanguage)
    }
  }, [activeLng, i18n.resolvedLanguage]) // 作用：当语言发生变化时，更新当前语言；
  // i18n.resolvedLanguage 如何产生的？：i18next 国际化框架提供的

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) {
      return
    }

    i18n.changeLanguage(lng)
  }, [i18n, lng]) // 作用：当语言发生变化时，切换语言

  useEffect(() => {
    if (cookies.i18next === lng) {
      return
    }

    setCookie(cookieName, lng, { path: '/' })
  }, [lng, cookies.i18next]) // 作用：当语言发生变化时，设置 cookie

  return ret
}
