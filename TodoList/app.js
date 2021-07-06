const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //mongoose 연동


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

////////////////// mongodb //////////////////
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

//schema
const itemsSchema = {
  name: String
};

//collection 생성
const Item = mongoose.model("Item", itemsSchema);


//data 추가
const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item"
});
const item3 = new Item({
  name: "<-- Hit this to delete an item"
});

//insert items
const defaultItems = [item1, item2, item3];


///////////////////// home page ///////////////////////

app.get("/", (req, res) => {
  //mongodb data 읽어오기
  //{} -> 모든 item을 읽어옴
  Item.find({}, function(err, foundItems){
    //item이 없는 경우에만 실행
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log("Succesfully saved the items!");
        }
      });

      //render 해주기 위해 다시 호출
      res.redirect("/");

    } else{
      res.render("list", {
        listTitle: "Today",
        newListItem: foundItems
      });
    }
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

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
