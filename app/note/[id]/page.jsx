import React from 'react'
// import { getNote } from '@/lib/redis'
// import { getNote } from '@/lib/strapi'
import { getNote } from '@/lib/prisma'
import Note from '@/components/Note'
import { sleep } from '@/lib/utils'

const NoteDetails = async ({ params }) => {
  // 动态路由 获取笔记 id
  const { id } = await params

  const note = id !== 'undefined' ? await getNote(id) : null

  // 为了让 Suspense 的效果更明显
  await sleep(300)

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
