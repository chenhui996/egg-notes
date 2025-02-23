// 获取 Strapi 中的所有笔记
export const getAllNotes = async () => {
  const response = await fetch('http://localhost:1337/api/notes')
  const { data } = await response.json()

  const res = {}

  data.forEach(item => {
    const { title, documentId, content, slug, updatedAt } = item

    res[slug] = JSON.stringify({
      title,
      documentId,
      content,
      updatedTime: updatedAt
    })
  })

  return res
}

// 添加笔记到 Strapi
export const addNote = async paramsObj => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 4377468b92a9604b0f8c08be62d85fef119e2ec914d2d78b9d27fd024b2adc64fac9da80db79e55f86517134c199622e89eb24f0de5043d5f1f06179e51886ed907d76d4a3b4c5c55e30070065d62310aac293991e584769800c27fbba62790e67592ca386422042bffd8c9064fbb21a1df6d7d6a65bc47643551d988bd1cc97'
    },
    body: JSON.stringify({
      data: JSON.parse(paramsObj)
    })
  }

  const response = await fetch('http://localhost:1337/api/notes', params)
  const { data } = await response.json()

  return data.slug
}

// 更新 Strapi 中的笔记
export const updateNote = async (uuid, dataObj) => {
  const { documentId } = await getNote(uuid)
  const response = await fetch(
    `http://localhost:1337/api/notes/${documentId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 4377468b92a9604b0f8c08be62d85fef119e2ec914d2d78b9d27fd024b2adc64fac9da80db79e55f86517134c199622e89eb24f0de5043d5f1f06179e51886ed907d76d4a3b4c5c55e30070065d62310aac293991e584769800c27fbba62790e67592ca386422042bffd8c9064fbb21a1df6d7d6a65bc47643551d988bd1cc97'
      },
      body: JSON.stringify({
        data: JSON.parse(dataObj)
      })
    }
  )

  const { data } = await response.json()

  return data.slug
}

// 获取 Strapi 中的笔记
export const getNote = async uuid => {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
  )
  const { data } = await response.json()

  const { id, documentId, title, content, updatedAt } = data[0]

  return { id, documentId, title, content, updatedTime: updatedAt }
}

// 删除 Strapi 中的笔记
export const delNote = async uuidStr => {
  const { documentId } = await getNote(uuidStr)

  await fetch(`http://localhost:1337/api/notes/${documentId}`, {
    method: 'DELETE',
    headers: {
      ['Content-Type']: 'application/json',
      Authorization:
        'Bearer 4377468b92a9604b0f8c08be62d85fef119e2ec914d2d78b9d27fd024b2adc64fac9da80db79e55f86517134c199622e89eb24f0de5043d5f1f06179e51886ed907d76d4a3b4c5c55e30070065d62310aac293991e584769800c27fbba62790e67592ca386422042bffd8c9064fbb21a1df6d7d6a65bc47643551d988bd1cc97'
    }
  })
}
