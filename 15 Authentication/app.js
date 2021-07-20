require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

/*
//.env 확인 log
console.log(process.env.API_KEY);
*/

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});


const User = new mongoose.model("User", userSchema);

//////////////////////////////get///////////////////////////////
app.get("/", (req, res)=>{
  res.render("home"); //ejs 페이지 render
});

app.get("/login", (req, res)=>{
  res.render("login");
});

app.get("/register", (req, res)=>{
  res.render("register");
});

//////////////////////////////post///////////////////////////////
/*사용자 email, password 등록*/
app.post("/register", (req, res)=>{
    const newUser = new User({
      email: req.body.username,
      password: md5(req.body.password)
    });

    newUser.save((err)=>{
      if(err){
        console.log(err);
      }else{
        res.render("secrets");
      }
    });
});

/*사용자 email, password 확인*/
app.post("/login", (req, res)=>{
  const username = req.body.username;
  const password = md5(req.body.password); //hash한 결과와 비교

  User.findOne({email: username}, (err, foundUser)=>{
    if(err){
      console.log(err);
    }else{
      if(foundUser){ //user 존재 -> password 확인
        if(foundUser.password === password){
          //successfully Login
          res.render("secrets");
        }
      }
    }
  });
})



app.listen(3000, ()=>{
  console.log("Server started on port 3000");
})
