'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { importNote } from '@/actions'

const SidebarImport = () => {
  const router = useRouter()

  const onChange = async event => {
    const fileInput = event.target

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('files list is empty')
      return
    }

    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const data = await importNote(formData)
      router.push(`/note/${data.uid}`)
    } catch (error) {
      console.error('something went wrong')
    }

    event.target.type = 'text'
    event.target.type = 'file'
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor='file' style={{ cursor: 'pointer' }}>
        Import .md File
      </label>
      <input
        type='file'
        id='file'
        name='file'
        multiple
        style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}
        onChange={onChange}
        accept='.md'
      />
    </div>
  )
}

export default SidebarImport
