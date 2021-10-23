const express = require("express")
const https = require("https")
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const query = req.body.cityName
  const appid = "d7e7803eb596679fb3199edae16767c6"
  const units = "metric"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}&units=${units}`

  https.get(url, (weatherRes) => {
    if (200 <= weatherRes.statusCode && weatherRes.statusCode <= 299) {
      weatherRes.on("data", (data) => {
        const weatherData = JSON.parse(data)
        res.write("<p>The weather is currently: " + weatherData.weather[0].description + "</p>")
        res.write("<h1>The temperature in " + weatherData.name + " is " + Math.round(weatherData.main.temp) + "C, but it feels like " + Math.round(weatherData.main.feels_like) + "C</h1>")
        res.write("<img src=http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png>")
        res.send()
      })
    }
    else {
      res.send("Something went wrong, please try again")
    }
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000")
})


//api.openweathermap.org/data/2.5/weather?q=Paris&appid=d7e7803eb596679fb3199edae16767c6&units=metric
