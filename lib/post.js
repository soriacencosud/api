const { readFile, writeFile } = require('../services/filesystem')
const path = require('path')


const file = path.join(__dirname, '../data/posts.json')


const getPosts = () => 
  readFile(file)


const getPostById = (id) => {
  const posts = getPosts(file)
  return posts.find(n => n.id === Number(id))
}


const storePost = (newItem) => {
  const currentPosts = getPosts()
  const updatedPosts = [...currentPosts, newItem]
  if (writeFile(file, updatedPosts)) return newItem
}


const updatePost = (item) => {
  const oldPost = getPostById(item.id, file)
  const newPost = {...oldPost, ...item}
  const items = getPosts(file)
  const updatedPosts = items.map(u => u.id === item.id ? newPost : u )
  if (writeFile(file, updatedPosts)) return newPost
}

const destroyPost = (id) => {
  const items = getPosts(file)
  const index = items.findIndex(u => u.id === id)
  const updatedPosts = [...items]
  const deletedPost = updatedPosts.splice(index, 1)
  if (writeFile(file, updatedPosts)) return deletedPost[0]
}


const createPost = (data) => {
  const date = new Date
  return {
    id: createPostId(getPosts()),
    isActive: true,
    createdAt: date,
    lastModified: date,
    title: '',
		slug: '',
		excerpt: '',
		content: '',
    author: '',
    ...data
  }
}


const createPostId = (posts) => {
  if (!posts.length) return 0
  const ids = posts.map(n => n.id)
  const max = Math.max(...ids)
  return max + 1
}



module.exports = {
  getPosts,
  getPostById,
  storePost,
  updatePost,
  destroyPost,
  createPost,
  createPostId
}
