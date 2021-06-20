//jshint esversion:6

exports.getDate = function(){
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  //today 객체를 string으로
  return today.toLocaleDateString("eng-EN", options);
}

exports.getDay = function(){
  const today = new Date();
  const options = {
    weekday: "long"
  };

  //today 객체를 string으로
  return today.toLocaleDateString("eng-EN", options);
}
