let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level;  //현재 레벨

//자동재생 제공 X
//SOUND
function soundPlay(color){
  switch(color){
    case "green":
      let greenAudio= new Audio('sounds/green.mp3');
      greenAudio.play();
      break;
    case "red":
      let redAudio= new Audio('sounds/red.mp3');
      redAudio.play();
      break;
    case "yellow":
      let yellowAudio= new Audio('sounds/yellow.mp3');
      yellowAudio.play();
      break;
    case "blue":
      let blueAudio= new Audio('sounds/blue.mp3');
      blueAudio.play();
      break;
  }
}

//ANIMATION
function animatePress(pressBtn){
  $("#"+pressBtn).addClass("pressed");
  setTimeout(function(){
      $("#"+pressBtn).removeClass("pressed");
  }, 100);

}

//[computer] random button ANIMATION
function animateRandomBtn(gamebutton, i){
  setTimeout(function() {
    console.log(gamebutton);

    $("#"+gamebutton).fadeOut(100).fadeIn(100);
    soundPlay(gamebutton);
  }, 500*i);
}

//[computer] next button
function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);

 // $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
 // soundPlay(randomChosenColour);

 //전체버튼 보여주기
 for(var i=0; i<gamePattern.length; i++){
   animateRandomBtn(gamePattern[i], i);
 }

  //level
  $("h1").text("Level " + level);
  level++;
}

//[computer] user & computer pattern check
function patternCheck(){
  let checkValue = true;
  for(let i=0; i<userClickedPattern.length; i++){
    if(gamePattern[i] !== userClickedPattern[i]){
      checkValue = false;
      break;
    }
  }

  if(checkValue){ //===
    //이전에 틀린경우를 구분하기 위함
    if(userClickedPattern.length === gamePattern.length){
      userClickedPattern = []; //배열 초기화
      setTimeout(nextSequence, 1000);
    }
  }else{ //!==
    $("body").addClass("gameover");
    setTimeout(function(){
        $("body").removeClass("gameover");
        $("h1").text("Game Over, Press [A] Key to Restart");
    }, 200);
  }
}

//[user] button click
$(".btn").click(function(event){
  if(gamePattern.length!==0) { //게임 시작 시
    let userChosenColour = event.target.id;     //$(this).attr("id") 와 동일
    userClickedPattern.push(userChosenColour);
    soundPlay(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);
    patternCheck();
  }
});


//[user] keyboard "A" press
$(document).on("keypress", function(event){
  console.log(event.key);
  if(event.key === "a" || event.key === "A"){
    userClickedPattern = []; //배열 초기화
    gamePattern = [];
    level = 1;
    nextSequence();
  }
});
