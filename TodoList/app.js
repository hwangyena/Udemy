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

const listSchema = {
  name: String,
  items: [itemsSchema]
}

//collection 생성
const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

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
  const itemName = req.body.newItem; //+ 버튼 클릭시 넘어오는 text 객체

  //mongoose 객체로 생성
  const newItem = new Item({
    name: itemName
  });

  newItem.save(); //새로운 item DB에 추가

  //redirect 해서 screen에 render
  res.redirect("/");
})

///////////////////// delete request  ///////////////////////
/// 추가 기능 -> 휴지통으로 만들어서 삭제 기능을 구현하는거!!!
app.post("/delete", (req,res)=>{
  const checkItem = req.body.checkbox;

  //check된 box 삭제
  Item.findByIdAndRemove(checkItem, (err)=>{
    if(!err){
      console.log("Succesfully delete the item");
      res.redirect("/");
    }
  });
});

///////////////////// customList page ///////////////////////
app.get("/:customListName", (req, res)=>{
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, (err, list)=>{
    if(!err){
      console.log("list: "+list);
      if(!list){
        //Create a new list
        console.log("Doesn't exist!");

        const list = new List({
          name: customListName, //새로 연결하는 페이지의 이름
          items: defaultItems   //새로운 페이지에서의 todoList data 저장
        })
        list.save();
        res.redirect("/"+customListName);
      }else{
        //Show an existing list
        console.log("Exists!");

        //EJS 페이지로 render
        res.render("list", {listTitle: list.name, newListItem: list.items});
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
