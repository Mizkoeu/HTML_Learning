/* function setup() {
  console.log("hello");
  createCanvas(600, 400);
}

function draw() {
  fill("#333");
  ellipse(50, 50, 100, 100);
}

function myFunction() {
      document.getElementById("click").onclick = myFunction2;
      document.getElementById("demo").innerHTML = "Such web trickery!";
}

function myFunction2() {
      document.getElementById("click").onclick = myFunction;
      document.getElementById("demo").innerHTML = "Nice try. Do that again!"
} */

window.onload=function() {
	canv=document.getElementById("game");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	setInterval(update,1000/15);
}

tile = 20;
px = 10;
py = 20;
vx = vy = 0;
platform_x = 10;
platform_y = 5;
platWidth = platHeight = 10;


function update() {
  if ((py >= tile && vy < 0) || py < tile) {
    py += vy;
  }
  if ((px >= tile -1  && vx < 0) || (px <= 0 && vx >0) || (px > 0 && px < tile - 1)){
    px += vx;
  }
  diff = px - platform_x;
  platform_x -= 1;
  if (platform_x <= -10) {
    if (checkBoundary()) {
      platform_x = 20;
      px = platform_x + diff;
    } else {
      platform_x = 20;
    }
  } else if (diff > platWidth && px > tile & py <= platform_y + platHeight && py > platform_y) {
    console.log("jump");
    px = platform_x + platWidth - 1;
    //console.log(checkBoundary());
  } else if (checkBoundary()) {
    px = platform_x + diff;
  }
  collide();

  ctx.fillStyle="black";
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.fillStyle="lime";
  ctx.fillRect(platform_x * tile, platform_y * tile, platWidth*tile, platHeight*tile);
  drawCirc(px, py);
  vx = vy = 0;
}

function checkBoundary() {
  if (px <= (platform_x + platWidth) && px > platform_x
    && py <= (platform_y + platHeight) && py > platform_y) {
  return true;
  }
}

function drawCirc(px, py){
  ctx.beginPath();
  ctx.arc((px+.5)*tile, tile*(py-.5), .5*tile, 0, 2*Math.PI, false);
  ctx.fillStyle="red";
  ctx.fill();
}

function collide() {

  if (py >= platform_y && py <= platform_y + platHeight) {
      if (px === platform_x) {
      resetPlayer();
    }
  }
}

function resetPlayer() {
  py = 20;
  px = 10;
}

function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:
			vx=-1;vy=0;
			break;
		case 38:
			vx=0;vy=-1;
			break;
		case 39:
			vx=1;vy=0;
			break;
		case 40:
			vx=0;vy=1;
			break;
	   }
  }
