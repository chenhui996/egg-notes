import React, { Suspense } from 'react'
import Link from 'next/link'
// import { getAllNodes } from '@/lib/redis'
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from '@/components/NoteListSkeleton'

const Sidebar = async () => {
  return (
    <>
      <section className='col sidebar'>
        <Link href={'/'} className='linlk--unstyled'>
          <section className='sidebar-header'>
            <img
              className='logo'
              src='/logo.svg'
              width={22}
              height={20}
              alt=''
              role='presentation'
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className='sidebar-menu' role='menubar'>
          <EditButton noteId={null}>New</EditButton>
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
