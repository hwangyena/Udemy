const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

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

//Insert 'Fruit : collection'
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
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
})

//fruit.save();

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    fruits.forEach((item)=>console.log(item.name));

    mongoose.connection.close();
  }
});
