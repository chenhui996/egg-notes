import React from 'react'

const DeleteButton = ({ isDraft, formAction, pending }) => {
  return (
    !isDraft && (
      <button
        className='note-editor-delete'
        disabled={pending}
        role='menuitem'
        formAction={formAction}
      >
        <img
          src='/cross.svg'
          width='10px'
          height='10px'
          alt=''
          role='presentation'
        />
        Delete
      </button>
    )
  )
}

export default DeleteButton
