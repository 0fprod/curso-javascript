var minigame = document.querySelector('#minijuego');
var greenball = document.querySelector('#greenball');
var redball   = document.querySelector('#redball');
var gamecanvas = document.querySelector('#gamecanvas');

var speed = 3;
var interval;

//Posiciones iniciales player & enemy
var posx_green = parseInt(parsePixel(getComputedStyle(greenball).left + ''));
var posy_green = parseInt(parsePixel(getComputedStyle(greenball).top + ''));
var posx_red = parseInt(parsePixel(getComputedStyle(redball).left + ''));
var posy_red = parseInt(parsePixel(getComputedStyle(redball).top + ''));
var limitx = parseInt(parsePixel(getComputedStyle(gamecanvas).width));
var limity = parseInt(parsePixel(getComputedStyle(gamecanvas).height));

minigame.addEventListener('mouseenter', addWindowEvents);
minigame.addEventListener('mouseleave', removeWindowEvents);

function addWindowEvents(){
  window.addEventListener('keypress', keyHandler);
  document.querySelector('#minijuego p:last-child').innerHTML = 'Teclas habilitadas';
  interval = window.setInterval(enemy, 100);

}
function removeWindowEvents(){
  window.removeEventListener('keypress', keyHandler);
  document.querySelector('#minijuego p:last-child').innerHTML = 'Teclas deshabilitadas';
  window.clearInterval(interval);
}

//Ememigo
function enemy(){
  //if((posx_red >= 0 && posx_red <= limitx) && (posy_red >= 0 && posy_red <= limity)){
    if(posx_green > posx_red){
      posx_red += speed;
      redball.style.left = posx_red + 'px';
    }
    if(posx_green < posx_red){
      posx_red -= speed;
      redball.style.left = posx_red + 'px';
    }
    if(posy_green < posy_red){
      posy_red -= speed;
      redball.style.top = posy_red + 'px';
    }
    if(posy_green > posy_red){
      posy_red += speed;
      redball.style.top = posy_red + 'px';
    }
  //}
}

function keyHandler(evt){
  evt.preventDefault();

  switch (evt.keyCode) {
    case 39: //right
      if(posx_green < limitx){
        posx_green += speed;
        greenball.style.left = posx_green + 'px';
      }
      else {
        posx_green = limitx - 5;
        greenball.style.left = posx_green + 'px';
      }
      break;
    case 38: //up
      if(posy_green > 0){
        posy_green -= speed;
        greenball.style.top = posy_green + 'px';
      }
      else {
        posy_green = 5;
        greenball.style.top = posy_green + 'px';
      }
      break;
    case 37: //left
      if(posx_green > 0){
        posx_green -= speed;
        greenball.style.left = posx_green + 'px';
      }
      else {
        posx_green = 5;
        greenball.style.left = posx_green + 'px';
      }
      break;
    case 40: //down
      if(posy_green < limity){
        posy_green += speed;
        greenball.style.top = posy_green + 'px';
      }
      else {
        posy_green = limity - 5;
        greenball.style.top = posy_green + 'px';
      }
      break;
    default:
  }


}

function parsePixel(px){
  return px.substring(0, px.length - 2);
}
