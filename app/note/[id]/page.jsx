import React from 'react'
import { getNote } from '@/lib/redis'
import Note from '@/components/Note'

const NoteDetails = async ({ params }) => {
  // 动态路由 获取笔记 id
  const { id } = await params
  const note = await getNote(id)

  // 为了让 Suspense 的效果更明显
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  await sleep(3000)

  if (note == null) {
    return (
      <div className='note--empty-state'>
        <span className='note-text--empty-state'>
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <Note noteId={id} note={note} />
}

export default NoteDetails
