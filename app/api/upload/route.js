import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import { join } from 'path'
import { stat, mkdir, writeFile } from 'fs/promises'
// import mime from 'mime'
import { addNote } from '@/lib/redis'
import { revalidatePath } from 'next/cache'

export async function POST (request) {
  // 获取 formData
  const formData = await request.formData()
  const file = formData.get('file')

  // 空值判断
  if (!file) {
    return NextResponse.json({ error: 'File is required.' }, { status: 400 })
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer()) // ArrayBuffer 转 Buffer
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}` // 上传目录
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir) // 上传目录绝对路径

  try {
    await stat(uploadDir) // 判断目录是否存在
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true }) // 递归创建目录
    } else {
      console.error(error)
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      )
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
    revalidatePath('/', 'layout')

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFileName}`,
      uid: res
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
