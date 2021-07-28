import React from "react";
import ReactDOM from "react-dom";

const img = "https://picsum.photos/200";
const customStyle = {
  color: "red",
  fontSize: "20px",
  border: "1px solid black"
};

customStyle.color = "green";


ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">
      My Favourite Foods
    </h1>
    <div>
      <img
        className="food-img"
        alt="chicken" src="http://www.bhc.co.kr/upload/bhc/menu/ck20150130_470_v.jpg"
      />
      <img
        className="food-img"
        alt="tteokboki" src="https://i.pinimg.com/originals/9a/ef/b3/9aefb3f244dbec9e6edeefdf08c39290.jpg"
      />
      <img
        className="food-img"
        alt="jjimddark" src="https://admin.foodupusa.com/files/stores/stores_1588894035.jpg"
      />
    </div>
    <img alt="" src={img + "?grayscale"} />

    <h1 style={customStyle}>Hello World!</h1>
  </div>,
  document.getElementById("root")
);
