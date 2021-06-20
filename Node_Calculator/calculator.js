const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//home route
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
  // 현재 파일 위치 알려줌(서버가 다른 위치에 가더라도 불러올 수 있도록 해줌)
});

app.post("/", (req, res)=>{
  console.log(req.body.num1);
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1+num2;

  res.send("The result " + result);
});

//BMI bmiCalculator route
app.get("/bmicalculator", (req, res)=>{
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmicalculator", (req,res)=>{
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  let result = weight / (height*height) * 10000;

  res.send("Your BMI is "+result);
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
