let numberOfDrumBtn = document.querySelectorAll(".drum");

//생성자
function playAudio(audioName){
  this.audioName = audioName;
  this.playThis = function(){
    let audio = new Audio(audioName);
    audio.play();
  }
}

//이벤트 발생 키 찾아주는 function
function findKey(key){
  let audio;
  switch (key) {
    case "w":
      audio = new playAudio("sounds/tom-1.mp3");
      break;
    case "a":
      audio = new playAudio('sounds/tom-2.mp3');
      break;
    case "s":
      audio = new playAudio('sounds/tom-3.mp3');
      break;
    case "d":
      audio = new playAudio('sounds/tom-4.mp3');
      break;
    case "j":
      audio = new playAudio('sounds/snare.mp3');
      break;
    case "k":
      audio = new playAudio('sounds/crash.mp3');
      break;
    case "l":
      audio = new playAudio('sounds/kick-bass.mp3');
      break;
    default:
  }
  audio.playThis();
}

//버튼 animation
function buttonAnimation(key){
  let activeButton = document.querySelector("."+key);
  console.log(activeButton.classList);
  activeButton.classList.add("drum-active");
  setTimeout(function(){
    activeButton.classList.remove("drum-active");
  }, 200);

//  activeButton.innerHTML += "<div class='drum-active'></div>";
}

//버튼 클릭 리스너
for(let i=0; i<numberOfDrumBtn.length; i++){
  numberOfDrumBtn[i].addEventListener("click", function (){
    let buttonInnerHTML = this.textContent;
    findKey(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

//키보드 리스너
document.addEventListener("keypress", function(event){
//  console.log(event.key);
  findKey(event.key);
  buttonAnimation(event.key);
});
