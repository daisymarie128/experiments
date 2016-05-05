window.onload = function() {
  init();
};

var container,
		windowWidth,
		center,
		red,
		green,
		blue,
		text;

init = function() {

	windowWidth = window.innerWidth;
	center = windowWidth / 2;
	container = document.getElementById('container');
	text = document.getElementsByClassName('salut');
	red = text[0];
	green = text[1];
	blue = text[2];

	container.addEventListener('mousemove', function(evt) {
	  var mousePos = getMousePos(container, evt);
	  if(mousePos.x < center) {
	  	blue.style.left = mousePos.x - (red.offsetWidth/100)  + 'px';
	  	red.style.left = (windowWidth - mousePos.x) - (red.offsetWidth/100)  + 'px';
	  } else if (mousePos.x > center) {
	  	blue.style.left = mousePos.x - (blue.offsetWidth/100)  + 'px';
	  	red.style.left = (windowWidth - mousePos.x) - (red.offsetWidth/100)  + 'px';

	  }
	}, false);
}

function getMousePos(container, evt) {
  var rect = container.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


