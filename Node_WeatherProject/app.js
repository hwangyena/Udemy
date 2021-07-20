const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
  res.sendFile(__dirname+"/index.html");
})

app.post("/country", (req, res)=>{
  const query = req.body.cityName;
  const apiKey = "--apikey--";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
  https.get(url, (response)=>{
    console.log(response.statusCode);

    response.on("data",(data)=>{
      // console.log(data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      console.log(weatherData);
      console.log(temp);
      console.log(description);

      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
      res.write("<img src="+imgURL+">");
      res.send();
    })
  })
})

app.listen(3000, ()=>{
  console.log("Server is running on 3000");
})
