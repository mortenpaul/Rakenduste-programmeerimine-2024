const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/0x0', (req, res) => {
  res.send('0x0ss')
})

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

app.get('/posts/:postID', (req, res) => {
  res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})