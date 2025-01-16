import React from 'react'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader'

const SidebarNoteItem = ({ noteId, note }) => {
  const { title, content = '', updateTime } = note

  const contentProps = {
    id: noteId,
    title,
    expandedChildren: (
      <p className='sidebar-note-excerpt'>
        {content.substring(0, 20) || <i>(No content)</i>}
      </p>
    )
  }

  return (
    <SidebarNoteItemContent {...contentProps}>
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  )
}

export default SidebarNoteItem
