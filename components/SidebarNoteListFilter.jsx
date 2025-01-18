'use client'
import React from 'react'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import { useSearchParams } from 'next/navigation'

const SidebarNoteListFilter = ({ notes }) => {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('search')

  const data = notes.filter(
    ({ note }) =>
      !searchText || note.title.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <ul className='notes-list'>
      {data.map(({ noteId, note, header }) => {
        const contentProps = {
          id: noteId,
          title: note.title,
          expandedChildren: (
            <p className='sidebar-note-excerpt'>
              {note.content.substring(0, 20) || <i>(No content)</i>}
            </p>
          )
        }

        return (
          <li key={noteId}>
            <SidebarNoteItemContent {...contentProps}>
              {header}
            </SidebarNoteItemContent>
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarNoteListFilter
