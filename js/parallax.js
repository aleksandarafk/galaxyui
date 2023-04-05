//parallax effect for the planets that move in the background when the user touches the ship
var touchArea = document.querySelector("#touchArea");
touchArea.addEventListener("touchmove", parallax);

function parallax(e){
  touchArea.querySelectorAll(".object").forEach(function(move){
    var moving_value = move.getAttribute("data-value");
    var x = (e.touches[0].clientX * moving_value) / 250;
    var y = (e.touches[0].clientY * moving_value) / 250;

    move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
  });
}