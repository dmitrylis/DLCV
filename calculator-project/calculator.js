const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/bmicalculator', (req, res) => {
  const weight = Number(req.body.weight)
  const height = Number(req.body.height)

  const result = weight / Math.pow(height / 100.0, 2)
  res.send("Your BMI is: " + result)
})

app.listen(port, () => console.log("Server started on port 3000"))
