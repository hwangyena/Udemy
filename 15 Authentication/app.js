const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
    email: String,
    password: String
};

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
app.post("/register", (req, res)=>{
    const newUser = new User({
      email: req.body.username,
      password: req.body.password
    });

    newUser.save((err)=>{
      if(err){
        console.log(err);
      }else{
        res.render("secrets");
      }
    });
});


app.post("/login", (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;

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
