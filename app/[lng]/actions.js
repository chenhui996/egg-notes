'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis'
import { revalidatePath } from 'next/cache'

import {sleep} from '@/lib/utils'


const schema = z.object({
  title: z.string(),
  content: z
    .string()
    .min(1, 'Content must not be empty')
    .max(100, 'Content must be less than 100 characters')
})

const saveNote = async (prevState, formData) => {
  const noteId = formData.get('noteId')
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  // Validate the form data
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return { errors: validated.error.issues }
  }

  // 为了让效果更明显
  await sleep(1000)

  if (noteId) {
    updateNote(noteId, JSON.stringify(data))
    revalidatePath(`/`, 'layout')
    // redirect(`/note/${noteId}`)
  } else {
    const newNoteId = await addNote(JSON.stringify(data))
    revalidatePath(`/`, 'layout')
    // redirect(`/note/${newNoteId}`)
  }

  return { message: `Add Success!` }
}

const deleteNote = async (prevState, formData) => {
  const noteId = formData.get('noteId')

  // 为了让效果更明显
  await sleep(1000)

  delNote(noteId)
  revalidatePath(`/`, 'layout')
  redirect('/')
}

export { saveNote, deleteNote }
