const express = require("express");
const app = express();

//사용자한테 요청이 왔을때 사용자에게 돌려주는
//Express에서 제공하는 method
//브라우저가 우리 서버에 들어왔을 때 줄 request
// "/" 홈페이지 주소
app.get("/", (req, res)=>{ //callback 함수
  // console.log(req); //사용자(request)의 정보를 cmd 창에 보여줌
  //response : 서버 호출 됐을 때 반응, 화면에 보여주는 것
  res.send("<h1>hello, world!</h1>");
});

//contact 페이지
app.get("/contact", function(req, res){
  res.send("Contact me at: center7332@naver.com");
})

//about 페이지
app.get("/about", (req,res)=>{
  res.send("<h1>Hi my name is yena!</h1>");
})

app.get("/hobbies", (req, res)=>{
  res.send("my hobbies!!");
})
//3000 port로 서버 열었음
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
