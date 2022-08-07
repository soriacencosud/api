const { respondWithInvalidRequest, respondWithInternalError } = require('../lib/utils')
const { getPosts, getPostById, storePost, updatePost, destroyPost, createPost } = require('../lib/post')


const index = (req, res) => {
  const posts = getPosts()
  res.status(200).json(posts)
}

const show = (req, res) => {
  try {
    if (req.params.id !== undefined) {
      const id = Number(req.params.id)

      const reg = getPostById(id)
      if (reg) {
        return res.status(200).json(reg)
      }

      return respondWithInvalidRequest(res, 'El post no existe.', 404)
    }

    throw 'El id está undefined'
    
  } catch (e) {
    respondWithInternalError(e, res)
  }
}

const store = (req, res) => {
  if (req.errors) return respondWithInvalidRequest(res, req.errors)

  try {
    const posts = getPosts()
    const post = createPost(req.body, posts);
    const reg = storePost(post)
    res.status(201).json(reg)

  } catch (e) {
    return respondWithInternalError(e, res)
  }
}

const update = (req, res) => { 
  if (req.errors) return respondWithInvalidRequest(res, req.errors)

  try {
    const post = {...req.body}
    if (post.id !== undefined) {
      post.id = Number(post.id)
      post.lastModified = new Date
      
      if (getPostById(post.id)) { 
        const reg = updatePost(post)
        return res.status(200).json(reg)
      }
      
      return respondWithInvalidRequest(res, 'El post no existe.', 404)
    }

    throw 'El id está undefined'

  } catch (e) {
    return respondWithInternalError(e, res)
  }
}

const destroy = (req, res) => {
  if (req.errors) return respondWithInvalidRequest(res, req.errors)

  try {
    if (req.query.id !== undefined) {
      const id = Number(req.query.id)
      
      if (getPostById(id)) {
        const reg = destroyPost(id)
        return res.status(200).json(reg)
      }

      return respondWithInvalidRequest(res, 'El post no existe.', 404)
    }

    throw 'El id está undefined'

  } catch (e) {
    return respondWithInternalError(e, res)
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}