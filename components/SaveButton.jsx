import React from 'react'

const SaveButton = ({ formAction, pending }) => {
  return (
    <button
      className='note-editor-done'
      disabled={pending}
      type='submit'
      role='menuitem'
      formAction={formAction}
    >
      <img
        src='/checkmark.svg'
        width='14px'
        height='10px'
        alt=''
        role='presentation'
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  )
}

export default SaveButton
