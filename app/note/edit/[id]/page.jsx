import React from 'react'
import NoteEditor from '@/components/NoteEditor'
// import { getNote } from '@/lib/redis'
import { getNote } from '@/lib/strapi'
import {sleep} from '@/lib/utils'


const EditDetails = async ({ params }) => {
  const { id } = await params
  const note = await getNote(id)

  // 让效果更明显
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
