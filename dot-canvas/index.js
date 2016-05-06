/* -------------------

  Playing with canvas.
  TODO: 
  - move dots with mouse to give depth
  - make canvas resizable

------------------- */



var container = document.getElementById('container'),
    canvas = container.getBoundingClientRect(),
    ctx = container.getContext('2d'),
    dots = [],
    columns = 30,
    hieght = columns / 2.2,
    padding = 50,
    mouse = {
      x: 0, 
      y: 0
    };

// create our grid of dots
// make coordinates
function create() {

  for (var i = 1; i < columns; i++) {
    var x = Math.floor((((canvas.width - padding * 2) / (columns - 1)) * i) + padding);

    for (var j = 1; j < hieght; j++) {
      var y = Math.floor((((canvas.height - padding * 2) / (hieght - 1)) * j) + padding);

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
  // draw our circle
  for(var i = 0; i < dots.length; i++){
    var currentDotPos = dots[i];
    var newDotPos = moveDot(currentDotPos);
    var x = currentDotPos.x + newDotPos.x;
    var y = currentDotPos.y + newDotPos.y;
    var radius = currentDotPos.size;
    ctx.beginPath();

    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }
}

function moveDot(dot) {
  var newPosX,
      newPosY;

  // find the distance from the line to the mouse
  var currentDot = getDistance(dot, mouse);

  // flip the number. 
  // so that the dot is bigger if the mouse is near it.
  // if we dont do this all the dots are big and are smaller when you are near them
  dot.size = (200-currentDot) / 20;
  dot.size = dot.size < 1 ? 1 : dot.size;
  dot.angle = getAngle(dot, mouse);

  if (currentDot > 20) {
    newPosX = 20 * Math.cos(dot.angle * Math.PI / 180);
    newPosY = 20 * Math.sin(dot.angle * Math.PI / 180);
  } else {
    newPosX = currentDot * Math.cos(dot.angle * Math.PI / 180);
    newPosY = currentDot * Math.sin(dot.angle * Math.PI / 180);
  }
  return {
    x: newPosX,
    y: newPosY
  }
}

function getAngle(dot, mouse) {
  var x = mouse.x - dot.x;
  var y = mouse.y - dot.y;
  var angle = Math.atan2(y,x)/Math.PI*180;
  return angle;
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




