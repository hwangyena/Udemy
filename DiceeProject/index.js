let randomNum1 = Math.floor(Math.random()*6+1);
let player1Dice = document.getElementsByTagName("img")[0].setAttribute("src", `Images/dice${randomNum1}.png`);


let randomNum2 = Math.floor(Math.random()*6+1);
let player2Dice = document.getElementsByTagName("img")[1].setAttribute("src", `Images/dice${randomNum2}.png`);

if(randomNum1 > randomNum2){
  document.getElementById("whoWin").textContent = "👍Player 1 Wins!"
}else if(randomNum1 < randomNum2){
  document.getElementById("whoWin").textContent = "Player 2 Wins!👍"
}else{
  document.getElementById("whoWin").textContent = "Draw!"
}
