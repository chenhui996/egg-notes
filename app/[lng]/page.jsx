// app/page.js
import { useTranslation } from '@/app/i18n'

export default async function Page ({ params }) {
  const { lng } = await params
  const { t } = await useTranslation(lng)

  return (
    <div className='note--empty-state'>
      <span className='note-text--empty-state'>{t('initText')}</span>
    </div>
  )
}
