import React from 'react'
import NoteEditor from '@/components/NoteEditor'
import { getNote } from '@/lib/redis'

const EditDetails = async ({ params }) => {
  const { id } = await params
  const note = await getNote(id)

  // 让效果更明显
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  await sleep(300)

  if (note === null) {
    return (
      <div className='note--empty-state'>
        <span className='note-text--empty-state'>
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return (
    <NoteEditor
      noteId={id}
      initialTitle={note.title}
      initialBody={note.content}
    />
  )
}

export default EditDetails
