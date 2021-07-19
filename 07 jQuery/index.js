// $("h1").addClass("big-title m-50");

//$("h1").text("bye");

// $("button").html("<em>hey</em>");

/*jQuery*/
// console.log("jQuery: "+$("img").attr("src"));
// $("img").attr("src", "https://lh3.googleusercontent.com/proxy/HFs3LavWVJXXCYryRV-K-zP63GBDcbZ7r0zWZDxU4gO6Q4R9g2CU_pCjuGlpalQjpW5Nf0-Of4ejubmxkVqQ5j0V_i44hPw-41tG_w6BdPqA0wbnknaq4HewsU1zPkbYvf5dvnhs2ncPzGKG_bu5ZT_8doUQrWEHIxpFusn9QESlUFByjoPt30RbY5lu21D1_bgD_30VX2RgU-3-Tma1OLAKrEJ3Qm4LqwIog8HhLQ");

// $("h1").click(function() {
//   $("h1").css("color", "blue");
// });

// for(let i=0; i<5; i++){
//   document.querySelectorAll("button")[i].addEventListener("click", function(){
//     document.querySelector("h1").style.color = "purple";
//   });
// }

// $("button").click(function(){
//   $("h1").css("color", "green");
// });
//
// $(document).keypress(function(event){
//   $("h1").text(event.key);
// });

$(document).on("keypress", function(event){
  if(event.key === 'h') $("h1").hide();
  else if(event.key === 's') $("h1").show();
  else if(event.key === 't') $("h1").toggle();
  else if(event.key === 'o') $("h1").fadeOut();
  else if(event.key === 'i') $("h1").fadeIn();
  else if(event.key === 'f') $("h1").fadeToggle();
});

$(".slide-up").on("click", function(){
  $("img").slideUp();
});

$(".slide-down").on("click", function(){
  $("img").slideDown();
});

$(".slide-toggle").on("click", function(){
  $("img").slideToggle();
});

$(".big-btn").on("click", function(){
  $("img").animate({width: "50%"});
})

$(".small-btn").on("click", function(){
  $("img").animate({width: "30%"});
})

$(".ani").click(function(){
  $("img").fadeOut().fadeIn().animate({opacity:0.3});
})
