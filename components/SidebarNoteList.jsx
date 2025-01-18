import React from 'react'
import { getAllNotes } from '@/lib/redis'
import { sleep } from '@/lib/utils'
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader'
import SidebarNoteListFilter from '@/components/SidebarNoteListFilter'
import SidebarNoteItem from './SidebarNoteItem'

const SidebarNoteList = async () => {
  // await sleep(300)
  const notes = await getAllNotes()

  const data = Object.entries(
    typeof notes === 'string' ? JSON.parse(notes) : notes
  )

  if (data.length == 0) {
    return <div className='notes-empty'>{'No notes created yet!'}</div>
  }

  const result = data.map(([noteId, note]) => {
    const noteData = JSON.parse(note)
    return {
      noteId,
      note: noteData,
      header: (
        <SidebarNoteItemHeader
          title={noteData.title}
          updateTime={noteData.updateTime}
        />
      )
    }
  })

  return <SidebarNoteListFilter notes={result} />
  // return (
  //   <ul className='notes-list'>
  //     {data.map(([noteId, note]) => {
  //       const noteData = JSON.parse(note)
  //       return (
  //         <li key={noteId}>
  //           <SidebarNoteItem key={noteId} noteId={noteId} note={noteData} />
  //         </li>
  //       )
  //     })}
  //   </ul>
  // )
}

export default SidebarNoteList
