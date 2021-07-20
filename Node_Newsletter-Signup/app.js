const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
  res.sendFile(__dirname+"/signup.html");
  //  res.send("hello world!");
})

app.post("/", (req, res)=>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  //API
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  // console.log(data);

  let jsonData = JSON.stringify(data); //API에 전달하고자 하는 정보 -> JSON
  const url = "---url---";
  const options = {
    method: "POST", //http request method
    auth: "---url---" //인증
  }


  const request = https.request(url, options, (response)=>{
    response.on("data", (data)=>{
      console.log(JSON.parse(data)); //JSON으로 번역하여 출력

      console.log(response.statusCode);
      //HTTPS status 확인
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
    })
  })
  //JSON data -> API 서버로 전송
  request.write(jsonData);
  request.end();
})

app.listen(process.env.PORT || 3000,()=>{
  console.log("Server is running on port 3000");
})

app.post("/failure", (req, res)=>{
  res.redirect("/")
})
//API Key
//9ef4336a8ad8ff85221a31a534adc8e2-us1

//List id
//2d155d803c
