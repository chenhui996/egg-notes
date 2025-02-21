'use client'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'

const SidebarImport = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

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
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        console.error('something went wrong')
        return
      }

      const data = await response.json()
      startTransition(() => router.push(`/note/${data.uid}`))
      startTransition(() => router.refresh())
    } catch (error) {
      console.error('something went wrong')
    }

    event.target.type = 'text'
    event.target.type = 'file'

    // 解释：这里的代码是为了清空 input[type=file] 的值，以便用户可以多次选择同一个文件
    // 第一次修改 type 为 "text"
    // 通过设置 e.target.type = "text"，临时将 <input> 元素的类型更改为其他类型（例如 "text"）。
    // 这样会立即让浏览器"重置"文件输入字段的内部状态。
    // 第二次修改 type 为 "file"
    // 然后，再将 type 设置回 "file"，让文件输入字段恢复为文件选择类型。
    // 经过这种操作，文件输入字段的内部记录被清除，用户再次选择同一个文件时，onChange 事件就会被重新触发。
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
