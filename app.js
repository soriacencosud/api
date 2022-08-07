const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')
const apiRouter = require('./routes/api')

app.use(cors())
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Posts API')
})

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message:'No se pudo encontrar'
  })
})

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`)
})
