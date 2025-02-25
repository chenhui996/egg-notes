import { PrismaClient } from '@prisma/client'
import { auth } from 'auth'

const globalForPrisma = global

// 如果 globalForPrisma.prisma 存在，就使用它，否则创建一个新的 PrismaClient 实例
export const prisma = globalForPrisma.prisma || new PrismaClient()

// 如果不是生产环境，就将 prisma 实例挂载到 globalForPrisma 上
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// api 解释：获取所有笔记
export const getAllNotes = async () => {
  const session = await auth()
  if (!session) {
    return []
  } // 如果用户未登录，就返回一个空数组

  const notes = await prisma.note.findMany({
    where: {
      authorId: session?.user?.userId
    }
  }) // 用户登录即可 -> 获取所有的笔记

  // 构造返回数据
  const res = {}
  notes.forEach(note => {
    const { id, title, content, updatedAt } = note
    res[id] = JSON.stringify({
      title,
      content,
      updatedTime: updatedAt
    })
  })

  return res
}

// api 解释：添加笔记
export const addNote = async addObj => {
  const session = await auth()
  const { title, content } = JSON.parse(addObj)
  const result = await prisma.note.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: session?.user?.userId
        }
      }
    }
  })

  return result.id
}

// api 解释：更新笔记
export const updateNote = async (uuid, updateObj) => {
  const { title, content } = JSON.parse(updateObj)

  const res = await prisma.note.update({
    where: {
      id: uuid
    },
    data: {
      title,
      content
    }
  })

  return res.id
}

// api 解释：删除笔记
export const delNote = async uuid => {
  await prisma.note.delete({
    where: {
      id: uuid
    }
  })
}

// api 解释：获取单个笔记
export const getNote = async uuid => {
  const session = await auth()
  if (!session) {
    return
  }

  const { title, content, updateTime, id } = await prisma.note.findFirst({
    where: {
      id: uuid
    }
  })

  return {
    title,
    content,
    updateTime,
    id
  }
}

// api 解释：添加用户
export const addUser = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: []
      }
    }
  })

  return {
    name: username,
    username,
    userId: user.id
  }
}

// api 解释：获取用户
export const getUser = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      notes: true
    }
  })

  if (!user) return 0

  if (user.password !== password) return 1

  return {
    name: user.username,
    username,
    userId: user.id
  }
}

export default prisma
