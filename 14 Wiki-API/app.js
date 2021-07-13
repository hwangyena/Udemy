const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

//////////////////////////////////articles///////////////////////////////////////
//GET -> fetch all of the article
app.get("/articles", (req, res)=>{
  //article db 확인
  Article.find(function(err, foundArticles){
    if(!err){
      console.log(foundArticles);
      res.send(foundArticles)
    }else{
      res.send(err);
    }
  });
});

//POST -> confirm post working & article save to db
app.post("/articles", (req, res)=>{
  console.log(req.body.title);
  console.log(req.body.content);

  const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
  });

  //에러 확인 message send
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article.");
    }else{
      res.send(err);
    }
  });
});

//DELETE -> delete all data
app.delete("/articles", (req, res)=>{
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all articles");
    }else{
      res.send(err);
    }
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
})
