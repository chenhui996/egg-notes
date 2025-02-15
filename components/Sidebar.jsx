import React, { Suspense } from 'react'

// components
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from '@/components/NoteListSkeleton'
import Header from '@/components/Header'
import SidebarSearchField from '@/components/SidebarSearchField'
import { useTranslation } from '@/app/i18n'

const Sidebar = async ({ lng }) => {
  const { t } = await useTranslation(lng)
  const seatchT = t('search')

  return (
    <>
      <section className='col sidebar'>
        <Header />
        <section className='sidebar-menu' role='menubar'>
          <SidebarSearchField lng={lng} seatchT={seatchT} />
          <EditButton noteId={null}>{t('new')}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}

export default Sidebar
