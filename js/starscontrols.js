//dragging part - stars 
var myElement = document.getElementById('myElement');
  //variable for each star that is displayed on the html file
  var myBlock = document.getElementById('star');
  var myBlock1 = document.getElementById('star1');
  var myBlock2 = document.getElementById('star2');
  var myBlock3 = document.getElementById('star3');
  var myBlock4 = document.getElementById('star4');
  var myElement = document.getElementById('myElement');
  var elementDimensions = myElement.getBoundingClientRect();
  
  // create Hammer instances for each block in order to make them move
  var mc = new Hammer(myBlock);
  var mc1 = new Hammer(myBlock1);
  var mc2 = new Hammer(myBlock2);
  var mc3 = new Hammer(myBlock3);
  var mc4 = new Hammer(myBlock4);

  // add a "PAN" recognizer to each instance (all directions) in order to freely move
  mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
  mc1.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
  mc2.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
  mc3.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
  mc4.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

  // tie in the same handler function for both instances
  mc.on("pan", handleDrag);
  mc1.on("pan", handleDrag);
  mc2.on("pan", handleDrag);
  mc3.on("pan", handleDrag);
  mc4.on("pan", handleDrag);

  //last position for x and y and a boolean for dragging, in order to get the initial position of the stars - set in the css
  var lastPosX = 0;
  var lastPosY = 0;
  var isDragging = false;
  
  //function for dragging the different stars
  function handleDrag(ev) {
    var elem = ev.target;
    //if the stars are dragged, change the x and y of the element
    if (!isDragging) {
      isDragging = true;
      lastPosX = elem.offsetLeft;
      lastPosY = elem.offsetTop;
    }
    
    //calculate the x and y of each star and change the pixels based on the height and width
    var posX = ev.deltaX + lastPosX;
    var posY = ev.deltaY + lastPosY;
    
    if (posX >= 0 && posX <= elementDimensions.width - elem.offsetWidth) {
      elem.style.left = posX + "px";
    }
    if (posY >= 0 && posY <= elementDimensions.height - elem.offsetHeight) {
      elem.style.top = posY + "px";
    }
    //if you don't move the stars on the canvas, save their position
    if (ev.isFinal) {
      isDragging = false;
      lastPosX = posX;
      lastPosY = posY;
    }
  }