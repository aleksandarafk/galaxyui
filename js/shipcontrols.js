//a function that shows the animation of the ship
var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
  })();
  
  //declaring the variables for the touch area and the object that can be moved
  var screen = document.querySelector(".toucharea");
  var el = document.querySelector("#hitarea");
  
  //starting poing for the ship
  var START_X = Math.round((screen.offsetWidth - el.offsetWidth) / 2);
  var START_Y = Math.round((screen.offsetHeight - el.offsetHeight) / 2);
  
  var ticking = false;
  var transform;
  var timer;
  
  // create Hammer instance for the ship and adding the basic commands 
  var mc = new Hammer.Manager(el);
  
  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
  mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
  mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
  mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
  mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
  mc.add(new Hammer.Tap());
  
  // add a "PAN" recognizer to each instance
  mc.on("panstart panmove", onPan);
  mc.on("rotatestart rotatemove", onRotate);
  mc.on("pinchstart pinchmove", onPinch);
  mc.on("swipe", onSwipe);
  mc.on("tap", onTap);
  mc.on("doubletap", onDoubleTap);
  
  //if the input is final, resets the element
  mc.on("hammer.input", function(ev) {
    if(ev.isFinal) {
        resetElement();
    }
  });
  
  //logs the event
  function logEvent(ev) {
    //el.innerText = ev.type;
  }
  
  //function that resets the element to the original state
  function resetElement() {
    el.className = 'animate';
    transform = {
        translate: { x: START_X, y: START_Y },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
    requestElementUpdate();
  }
  
  //transforms the element, based on the scare, rotation and translate css properties
  function updateElementTransform() {
    var value = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
        'scale(' + transform.scale + ', ' + transform.scale + ')',
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
    ];
  
    value = value.join(" ");
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
    ticking = false;
  }
  //if the element is moved, update the animation
  function requestElementUpdate() {
    if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
    }
  }
  
  //function to change the pan recognizer
  function onPan(ev) {
    el.className = '';
    transform.translate = {
        x: START_X + ev.deltaX,
        y: START_Y + ev.deltaY
    };
  
    logEvent(ev);
    requestElementUpdate();
  }
  
  //initial scale of the element and the pinch event
  var initScale = 1;
  function onPinch(ev) {
    if(ev.type == 'pinchstart') {
        initScale = transform.scale || 1;
    }
  
    el.className = '';
    transform.scale = initScale * ev.scale;
  
    logEvent(ev);
    requestElementUpdate();
  }
  
  //initial angle of the ship
  //function that checks if the ship is rotated
  var initAngle = 0;
  function onRotate(ev) {
    if(ev.type == 'rotatestart') {
        initAngle = transform.angle || 0;
    }
  
    el.className = '';
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;
  
    logEvent(ev);
    requestElementUpdate();
  }
  
  //function that detects the swiping of the ship and changes the angle accordingly (left or right)
  function onSwipe(ev) {
    var angle = 50;
    transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
    transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
    transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;
    //setting a timeout funtion that sets the ship to the default's position
    clearTimeout(timer);
    timer = setTimeout(function () {
        resetElement();
    }, 300);
  
    logEvent(ev);
    requestElementUpdate();
  }
  //on tap function that transforms the ship
  function onTap(ev) {
    transform.rx = 1;
    transform.angle = 25;
    //setting a timeout funtion that sets the ship to the default's position
    clearTimeout(timer);
    timer = setTimeout(function () {
        resetElement();
    }, 200);
  
    logEvent(ev);
    requestElementUpdate();
  }
  //on double tap function that transforms the ship
  function onDoubleTap(ev) {
    transform.rx = 1;
    transform.angle = 80;
    //setting a timeout funtion that sets the ship to the default's position
    clearTimeout(timer);
    timer = setTimeout(function () {
        resetElement();
    }, 500);
  
    logEvent(ev);
    requestElementUpdate();
  }
  
  resetElement();  