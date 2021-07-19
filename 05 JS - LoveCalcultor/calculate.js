let loveScore = Math.random();
loveScore = Math.floor(loveScore*100+1);

document.getElementById('loveScore').innerHTML = loveScore+" %";
// console.log("loveScore: "+document.getElementById('loveScore').innerHTML);

if(loveScore === 100){
  document.getElementById('comment_plus').innerHTML="Soul mate 💗";
}else if(loveScore > 70 && loveScore <= 99){
  document.getElementById('comment_plus').innerHTML="loving relationship 🥰";
}else if(loveScore > 50){
  document.getElementById('comment_plus').innerHTML="warm friend 😊";
}else if(loveScore > 50){
  document.getElementById('comment_plus').innerHTML="friend 🤝";
}else{
  document.getElementById('comment_plus').innerHTML="Stranger 🙄";
}
