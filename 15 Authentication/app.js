require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require('express-session')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

/*
//.env 확인 log
console.log(process.env.API_KEY);

//md5 확인
console.log("strong hash: "+md5("12345abcdef"));
*/

/*use*/
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/*mongoose server connection*/
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

/*Mongoose*/
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.get("/secrets", (req, res)=>{
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.redirect("/login");
  }
});

/*session 종료*/
app.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/");
});

//////////////////////////////post///////////////////////////////
/*사용자 email, password 등록*/
app.post("/register", (req, res)=>{
  User.register({username: req.body.username}, req.body.password, (err, user)=>{
    if(err){
      console.log(err);
      res.redirect("/register");
    }
    else{
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

/*사용자 email, password 확인*/
app.post("/login", (req, res)=>{
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err)=>{
    if(err){
      console.log(err);
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
});


app.listen(3000, ()=>{
  console.log("Server started on port 3000");
})
