const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //mongoose 연동
const _ = require("lodash");        //lodash 연동


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

////////////////// mongodb //////////////////
mongoose.connect("---url---", {useNewUrlParser: true, useUnifiedTopology: true});

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
  const listName = req.body.list;   //+ 버튼 클릭시 넘어오는 버튼의 value -> listTitle(현재 페이지 명)

  //mongoose 객체로 생성
  const newItem = new Item({
    name: itemName
  });

  //default page
  if(listName === "Today"){
    newItem.save(); //새로운 item DB에 추가
    res.redirect("/"); //redirect 해서 screen에 render
  }
  //custom page
  else{
    //listName 찾음
    List.findOne({name: listName}, (err, foundList)=>{
      if(!err){
        foundList.items.push(newItem); //foundList의 item에 객체로 생성한 newItem 넣음
        foundList.save();
        res.redirect("/"+listName); //custom page로 redirect
      }
    })
  }


})

///////////////////// delete request  ///////////////////////
app.post("/delete", (req,res)=>{
  const checkItem = req.body.checkbox; //선택된 checkbox?
  const listName = req.body.listName; //어떤 페이지에서 넘어왔는지

  //default page
  if(listName === "Today"){
    //check된 box 삭제
    Item.findByIdAndRemove(checkItem, (err)=>{
      if(!err){
        console.log("Succesfully delete the item");
        res.redirect("/");
      }
    });
  }
  //custom page
  else{
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkItem}}}, function(err, foundList){
      if(!err){
        res.redirect("/" + listName);
      }
    });
  }

});

///////////////////// customList page ///////////////////////
app.get("/:customListName", (req, res)=>{
  const customListName = _.capitalize(req.params.customListName); //lodash 적용(맨앞만 대문자)

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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server started on port Succesfully");
})
