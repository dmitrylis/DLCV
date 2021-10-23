const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Home route</h1>')
})

app.get('/contact', (req, res) => {
  res.send('<h1>Contact route</h1>')
})

app.get('/about', (req, res) => {
  res.send('<h1>About route</h1>')
})

app.get('/hobbies', (req, res) => {
  res.send('<h1>Hobbies route</h1>')
})

app.listen(port, () => console.log("Server started on port 3000"))
