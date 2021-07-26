require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require('express-session')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findOrCreate');
const FacebookStrategy = require('passport-facebook').Strategy;

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
    password: String,
    googleId: String,
    facebookId: String,
    userSecret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//////////////////////Google OAuth/////////////////////////////
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


//////////////////////Facebook OAuth/////////////////////////////
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ facebookId: profile.id }, function(err, user) {
      return cb(err, user);
    });
  }
));


//////////////////////////////get///////////////////////////////
app.get("/", (req, res)=>{
  res.render("home"); //ejs 페이지 render
});

/*google*/
app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] }));

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

/*facebook*/
app.get("/auth/facebook",
  passport.authenticate('facebook', { scope: ["profile"] })
);

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
}));

app.get("/login", (req, res)=>{
  res.render("login");
});

app.get("/register", (req, res)=>{
  res.render("register");
});

/*
DB에 secret이 있는 것만 가져옴!
*/
app.get("/secrets", (req, res)=>{
  User.find({"userSecret": {$ne:null}}, (err, foundUser)=>{
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        res.render("secrets", {usersWithSecrets: foundUser});
      }
    }
  });
});

/*
secrets 내의 submit 버튼 - secret 추가
*/
app.get("/submit", (req, res)=>{
  if(req.isAuthenticated()){
    res.render("submit");
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

/*사용자가 입력한 text 저장*/
app.post("/submit", (req, res)=>{
  const submittedSecret = req.body.secret;
  console.log(req.user.id); //user에 대한 정보는 passport에 의해 req에 담겨져있,

  User.findById(req.user.id, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){ //유저 존재하는 경우-> userSecret 넣기
        foundUser.userSecret = submittedSecret;
        foundUser.save(function(){
          res.redirect("/secrets");
        })
      }
    }
  });

});

app.listen(3000, ()=>{
  console.log("Server started on port 3000");
})
