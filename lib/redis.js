import Redis from 'ioredis'

const redis = new Redis()

const initialData = {
  1702459181837:
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837:
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837:
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

const getAllNotes = async () => {
  const data = await redis.hgetall('nodes')

  if (Object.keys(data).length === 0) {
    await redis.hset('nodes', initialData)
  }

  return redis.hgetall('nodes')
}

const addNote = async data => {
  const uuid = Date.now().toString()
  // 判断 data 是否为 object
  const result = typeof data === 'string' ? data : JSON.stringify(data)

  await redis.hset('nodes', [uuid], result)

  return uuid
}

const updateNote = async (uuid, data) => {
  // 判断 data 是否为 object
  const result = typeof data === 'string' ? data : JSON.stringify(data)
  await redis.hset('nodes', [uuid], result)
}

const getNote = async uuid => {
  return JSON.parse(await redis.hget('nodes', uuid))
}

const delNote = async uuid => {
    return redis.hdel('nodes', uuid)
}

export { 
    getAllNotes, 
    addNote,
    updateNote,
    getNote,
    delNote 
}
