import React, { Suspense } from 'react'

// components
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from '@/components/NoteListSkeleton'
import Header from '@/components/Header'
import SidebarSearchField from '@/components/SidebarSearchField'
import { useTranslation } from '@/app/i18n'
import SidebarImport from '@/components/SidebarImport'

const Sidebar = async ({ lng }) => {
  const { t } = await useTranslation(lng)

  return (
    <>
      <section className='col sidebar'>
        <Header />
        <section className='sidebar-menu' role='menubar'>
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{t('new')}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  )
}

export default Sidebar
