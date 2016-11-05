var urls = ["https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/c1.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/c1s.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/c2.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/d1.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/d1s.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/e1.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/f1.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/f1s.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/g1.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/g1s.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/a1.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/a1s.mp3",
            "https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/b1.mp3"
          ];
var sounds = []
var piano = document.querySelector('#piano-container');

urls.forEach(function(item, index){
    sounds.push(new Audio(item));
    var element = document.createElement('div');
    element.addEventListener('click', function(){
      playSound(index);
    })

    if(item[item.lastIndexOf('.') - 1] == 's')
      element.classList.toggle('bkey');
    else
      element.classList.toggle('key');

    piano.appendChild(element);
});

function playSound(index){
  sounds[index].play();
}
