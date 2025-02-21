'use client'
import React, { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client.js'

const Spinner = ({ active = true }) => {
  return (
    <div
      className={['spinner', active ? 'spinner--active' : ''].join(' ')}
      role='progressbar'
      aria-busy={active}
    />
  )
}

const SidebarSearchField = ({ lng }) => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const { t } = useTranslation(lng, 'basic')

  const onSearch = event => {
    const value = event.target.value
    // console.log(value)

    // 联动 URL，更新 URL 中的 search 参数
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className='search' role='search'>
      <label className='offscreen' htmlFor='sidebar-search-input'>
        Search fpr a note by title
      </label>
      <input
        id='sidebar-search-input'
        placeholder={t('search')}
        type='text'
        onChange={onSearch}
      />
      <Spinner active={isPending} />
    </div>
  )
}

export default SidebarSearchField
