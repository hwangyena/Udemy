const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});


//fruitSchema
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your name data!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

//Insert 'Fruit : collection'
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 5,
  review: "soso"
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 7,
  review: "good"
});

const banana = new Fruit({
  name: "Banana",
  rating: 10,
  review: "so sweet"
});



//update john
Person.updateOne({name:"John"}, {favoriteFruit: banana},  function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Succesfully updated the document!");
  }
})
