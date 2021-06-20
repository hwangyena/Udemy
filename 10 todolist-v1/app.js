const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js"); //js파일 불러오가

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Do Workout", "Drink 2 liters of water"];
const workItems = [];

///////////////////// home page ///////////////////////

app.get("/", (req, res) => {

  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItem: items
  });
});


app.post("/", (req,res)=>{
  const item = req.body.newItem;

  //Work page에서 넘어온 정보 확인
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }


})


///////////////////// work page ///////////////////////
app.get("/work", (req, res)=>{
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems
  })
})


///////////////////// about page ///////////////////////
app.get("/about", (req, res)=>{
  res.render("about");
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
