import React from 'react'
import { getAllNotes } from '@/lib/redis'
import SidebarNoteItem from '@/components/SidebarNoteItem'

const SidebarNoteList = async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  await sleep(10000)
  const notes = await getAllNotes()

  const data = Object.entries(
    typeof notes === 'string' ? JSON.parse(notes) : notes
  )

  if (data.length == 0) {
    return <div className='notes-empty'>{'No notes created yet!'}</div>
  }

  return (
    <ul className='notes-list'>
      {data.map(([noteId, note]) => (
        <li key={noteId}>
          <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
        </li>
      ))}
    </ul>
  )
}

export default SidebarNoteList
