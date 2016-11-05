$(document).ready(function(){
  var active_angle = false;
  var soundsPaths = ['https://rawgit.com/Franjpr/curso-javascript/master/res/audio/laser_shoot.wav'
                    ,'https://rawgit.com/Franjpr/curso-javascript/master/res/audio/hit.wav'];

  //activa/desactiva la fijacion del angulo
  $("#canvas").on('click', function(){
    active_angle = !active_angle;
  });

  //Calcula el angulo segun la posicion del raton dentro del #canvas
  $("#canvas").on('mousemove', function(evt){
    if(active_angle){
      var borderOffset = parsePixel($(this).css('border-left-width'));
      var x = evt.offsetX + borderOffset;
      var y = parsePixel($(this).css('height')) - evt.offsetY + borderOffset;

      var angle = Math.atan2(y, x);

      $("#cannon").css('transform',' rotate(' + -toDegs(angle) + 'deg)');
      $("#angle").html(toDegs(angle).toPrecision(5) + 'º');
    }
  });

  $("#throw").on('mouseup', function(evt){
    throwProjectile(soundsPaths);
  });

  $("input").on('focus', function(){
    $(this).val(""); //clear textfield
  });


});//End of document ready

//Lanza el proyectil
function throwProjectile(soundsPaths){
  var speed = parseInt($("input").val() || 0);
  var angle = toRads(parseAngle($("#angle").html()));
  var xs = speed * Math.cos(angle); //x speed
  var ys = speed * Math.sin(angle); //y speed
  var g = 9.8;                                                 //Gravity acceleration
  var t = 0;

  new Audio(soundsPaths[0]).play();

  var tick = window.setInterval(function(){
    t += 0.05;
    //t++;
    var x = (xs * t);                           //pos X at time T
    var y = ys * t - 0.5 * g * Math.pow(t, 2) ; //pos y

    x = (x >= parsePixel($("#canvas").css('width'))) ? parsePixel($("#canvas").css('width')) : x; //Avoid projectile from exceeding #canvas width

    $("#projectile").css('bottom', y.toPrecision(3) + 'px');
    $("#projectile").css('left', x.toPrecision(3) + 'px');

    if(y.toPrecision(3) <= 0){
      new Audio(soundsPaths[1]).play();
      clearInterval(tick); //stop animation when pos Y reaches 0
    }
  }, 1);

}

function parsePixel(px){
  return px.substring(0, px.length - 2);
}

//Return number without º
function parseAngle(str) {
  return parseFloat(str.substring(0, str.length - 1));
}

function toDegs(angle){
  return angle * 180 / Math.PI;
}

function toRads(angle){
  return angle * Math.PI / 180;
}
