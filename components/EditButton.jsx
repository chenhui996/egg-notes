import React from 'react'
import Link from 'next/link'

const EditButton = ({ noteId, children }) => {
  const isDraft = noteId == null

  const btnProps = {
    className: [
      'edit-button',
      isDraft ? 'edit-button--solid' : 'edit-button--outline'
    ].join(' '),
    role: 'menuitem'
  }

  return (
    <Link href={`/note/edit/${noteId || ''}`} className='link--unstyled'>
      <button {...btnProps}>{children}</button>
    </Link>
  )
}

export default EditButton
