const express = require('express')
const router = express.Router()
const postRouter = require('./postRouter')


router.use('/post', postRouter)

module.exports = router
