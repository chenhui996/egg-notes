'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
// import { addNote, updateNote, delNote } from '@/lib/redis'
// import { addNote, updateNote, delNote } from '@/lib/strapi'
import { addNote, updateNote, delNote } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { stat, mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import dayjs from 'dayjs'

import { sleep } from '@/lib/utils'
import { log } from 'console'

const schema = z.object({
  title: z.string(),
  content: z
    .string()
    .min(1, 'Content must not be empty')
    .max(100, 'Content must be less than 100 characters')
})

const saveNote = async (prevState, formData) => {
  console.log('saveNote', formData);
  
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
    const slug = await updateNote(noteId, JSON.stringify(data))
    revalidatePath(`/`, 'layout')
    redirect(`/note/${slug}`)
  } else {
    const slug = await addNote(JSON.stringify(data))
    revalidatePath(`/`, 'layout')
    redirect(`/note/${slug}`)
  }

  return { message: `Add Success!` }
}

const deleteNote = async (prevState, formData) => {
  const noteId = formData.get('noteId')

  // 为了让效果更明显
  await sleep(1000)
  await delNote(noteId)
  revalidatePath(`/`, 'layout')
  redirect('/')
}

const importNote = async formData => {
  const file = formData.get('file')

  // 空值判断
  if (!file) {
    return { error: 'File is required.' }
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer())
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}` // 上传目录
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir) // 上传目录绝对路径

  try {
    await stat(uploadDir) // 判断目录是否存在
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true }) // 递归创建目录
    } else {
      console.error(error)
      return { error: 'Something went wrong.' }
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}` // 随机字符串
    const fileName = file.name.replace(/\.[^/.]+/g, '') // 文件名，替换规则解释例子：'example.md' => 'example'
    const fileExtension = file.name.split('.').pop() // 文件扩展名，例子：'example.md' => 'md'
    const uniqueFileName = `${fileName}-${uniqueSuffix}.${fileExtension}` // 唯一文件名，例子：example-abc123.md

    await writeFile(`${uploadDir}/${uniqueFileName}`, buffer) // 向指定文件写入数据

    // 调用接口，写入数据库
    const res = await addNote(
      JSON.stringify({
        title: fileName,
        content: buffer.toString('utf-8')
      })
    )

    // 清除缓存
    revalidatePath('/', 'layout') // tips：在 server 端调用 revalidatePath 会触发客户端的重新渲染，也就是清除缓存

    return { fileUrl: `${relativeUploadDir}/${uniqueFileName}`, uid: res }
  } catch (error) {
    console.error(error)
    return { error: 'Something went wrong.' }
  }
}

export { saveNote, deleteNote, importNote }
