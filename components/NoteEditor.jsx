'use client'
import React, { useState, useActionState, useEffect } from 'react'
// import { useFormState } from 'react-dom'
import NotePreview from '@/components/NotePreview'
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'
import { saveNote, deleteNote } from '../app/actions'

const initialState = {
  message: null
}

const NoteEditor = ({ noteId, initialTitle, initialBody }) => {
  const [saveState, saveFormAction, savePending] = useActionState(
    saveNote,
    initialState
  )
  const [, delFormAction, delPending] = useActionState(deleteNote, initialState)

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const isDraft = !noteId

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors)
    }
  }, [saveState])

  return (
    <div className='note-editor'>
      <form className='note-editor-form left' autoComplete='off'>
        <>
          <div className='note-editor-menu' role='menubar'>
            <input type='hidden' name='noteId' value={noteId} />
            <SaveButton
              formAction={saveFormAction}
              pending={delPending || savePending}
            />
            <DeleteButton
              isDraft={isDraft}
              formAction={delFormAction}
              pending={delPending || savePending}
            />
          </div>
          <div className='note-editor-menu'>
            {saveState?.message}
            {saveState.errors && saveState.errors[0].message}
          </div>
        </>

        <>
          <label className='offscreen' htmlFor='note-title-input'>
            Enter a title for your note
          </label>
          <input
            id='note-title-input'
            type='text'
            name='title'
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
          />
          <label className='offscreen' htmlFor='note-body-input'>
            Enter the body for your note
          </label>
          <textarea
            value={body}
            name='body'
            id='note-body-input'
            onChange={e => setBody(e.target.value)}
          />
        </>
      </form>

      <div className='note-editor-preview right'>
        <div className='label label--preview' role='status'>
          Preview
        </div>
        <h1 className='note-title'>{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}

export default NoteEditor
