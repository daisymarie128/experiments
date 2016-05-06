/* -------------------

  Playing with canvas.
  TODO: 
  - move dots with mouse to give depth
  - make canvas resizable

------------------- */



var container = document.getElementById('container'),
    canvas = container.getBoundingClientRect(),
    ctx = container.getContext('2d'),
    mouse = {
      x: 0, 
      y: 0
    },
    dots = [],
    width = 36,
    hieght = width / 2.2,
    size = 30,
    padding = 100;


// create our grid of dots
// make coordinates
function create() {

  for (var i = 1; i < width-1; i++) {
    var x = Math.floor((((canvas.width) / (width - 1)) * i));

    for (var j = 1; j < hieght-1; j++) {
      var y = Math.floor((((canvas.height) / (hieght - 1)) * j));

      dots.push({
        x: x,
        y: y
      });
    }
  }
}

function init() {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  canvas = container.getBoundingClientRect();
  animate();
}

init();
create();


// drawing and rendering of the dots
function render() {

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dot color
  ctx.fillStyle = '#47A84D';

  // for each dot
  for(var i = 0; i < dots.length; i++){
    var currentDotPos = dots[i];
    var newDotPos = moveDot(currentDotPos);
    var x = currentDotPos.x;
    var y = currentDotPos.y;
    var radius = currentDotPos.size;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
}

function moveDot(dot) {
  var dotScale;

  // find the distance from the line to the mouse
  var currentDot = getDistance(dot, mouse);

  // flip the number. 
  // so that the dot is bigger if the mouse is near it.
  // if we dont do this all the dots are big and are smaller when you are near them
  dot.size = (200 - currentDot) / 20;
  dot.size = dot.size < 1 ? 1 : dot.size;

  if (currentDot > 20) {
    dotScale = 20 * Math.cos(dot.angle * Math.PI / 180);
  } else {
    dotScale = currentDot * Math.cos(dot.angle * Math.PI / 180);
  }
  return {
    x: dotScale,
    y: dotScale
  }
}


// need to find out what size the dot should be
function getDistance(dot, mouse) {
  var x = dot.x - mouse.x;
  var y = dot.y - mouse.y;
  return Math.sqrt(x * x + y * y);
}

// events
window.onmousemove = function(event) {
    mouse.x = event.clientX - canvas.left;
    mouse.y = event.clientY - canvas.top;
}

// not workgin at the moment
// don't fully understand how to clear the canvas and recreate my stuff
function onWindowResize( event ) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    // canvas = container.getBoundingClientRect();
    create();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // render();
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

window.addEventListener( 'resize', onWindowResize, false );




