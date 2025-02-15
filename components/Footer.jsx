import React from 'react'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { locales } from '@/config'
import { useTranslation } from '@/app/i18n'

export const Foorter = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')

  return (
    <footer style={{ margin: 20 }}>
      <Trans i18nKey='languageSwitcher' t={t}>
        {' '}
        <strong>{{ lng }}</strong>
      </Trans>
      {locales
        .filter(l => lng !== l)
        .map((l, index) => (
          <span key={l}>
            {index > 0 && ' | '}
            <Link href={`/${l}`}>{l}</Link>
          </span>
        ))}
    </footer>
  )
}
