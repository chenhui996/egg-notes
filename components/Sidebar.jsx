import React, { Suspense } from 'react' 

// components
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from '@/components/EditButton'
import NoteListSkeleton from '@/components/NoteListSkeleton'
import Header from '@/components/Header'
import SidebarSearchField from '@/components/SidebarSearchField'

const Sidebar = async () => {
  return (
    <>
      <section className='col sidebar'>
        <Header />
        <section className='sidebar-menu' role='menubar'>
          <SidebarSearchField />
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
