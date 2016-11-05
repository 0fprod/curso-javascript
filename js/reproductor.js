var html_play   = document.querySelector('#play i');
var html_prev   = document.querySelector('#prev i');
var html_next   = document.querySelector('#next i');
var html_stop   = document.querySelector('#stop i');
var html_audio  = document.querySelector('audio');
var html_songTitle = document.querySelector('#title');
var html_songTime  = document.querySelector('#time');
var html_progress  = document.querySelector('#progress')
var html_playlist  = document.querySelector('#songs-list');

var currentSong = 0;
var playlist = ['http://scummbar.com/mi2/MI1-CD/01%20-%20Opening%20Themes%20-%20Introduction.mp3',
                'http://scummbar.com/mi2/MI1-CD/03%20-%20The%20Scumm%20Bar.mp3',
                'http://scummbar.com/mi2/MI1-CD/04%20-%20LeChuck\'s%20Theme.mp3',
                'http://scummbar.com/mi2/MI1-CD/11%20-%20Stan\'s%20Previously%20Used%20Ships.mp3'];

playlist.forEach(function(item, index){
  var li = document.createElement('div');
  li.innerHTML = normalizeTitle(item);
  li.addEventListener('click', function(){
    changeSong(index);
  });
  html_playlist.append(li);
});

html_play.parentNode.addEventListener('click', playPause);
html_next.parentNode.addEventListener('click', nextSong);
html_prev.parentNode.addEventListener('click', prevSong);
html_stop.parentNode.addEventListener('click', stop);

function playPause() {
  if(html_audio.src == "")  html_audio.src = playlist[currentSong];

  if(html_play.className == "fa fa-play"){
    html_play.className = 'fa fa-pause';
    html_songTitle.innerHTML = normalizeTitle(playlist[currentSong]);
    clearBolds();
    html_playlist.children[currentSong].style.fontWeight = 'bolder';
    html_audio.play();
    displayPlaylist(true);
  }
  else {
    html_play.className = 'fa fa-play';
    html_audio.pause();
  }
}

function stop(){
  html_play.className = 'fa fa-play';
  html_audio.pause();
  html_audio.currentTime = 0;
  displayPlaylist(false);
};

function prevSong(){
  html_play.className = 'fa fa-play';
  currentSong = (currentSong <= 0) ? playlist.length - 1 : --currentSong;
  html_audio.src = playlist[currentSong];
  playPause();
}

function nextSong(){
  html_play.className = 'fa fa-play';
  currentSong = (currentSong >= playlist.length - 1) ? 0 : ++currentSong;
  html_audio.src = playlist[currentSong];
  playPause();
}

function changeSong(index){
  currentSong = index;
  html_play.className = 'fa fa-play';
  html_audio.src = playlist[currentSong];
  playPause();
}

function normalizeTitle(str){
  str = decodeURIComponent(str).substr(str.lastIndexOf('/') + 1);
  str = str.substring(0, str.length - 4);
  str = str.substr(str.search(/[a-zA-Z]/g));
  return str;
}

html_audio.ontimeupdate = function(){
  html_songTime.innerHTML = parseTime(html_audio.currentTime, html_audio.duration);
  var scren_width = parsePixels(getComputedStyle(progress.parentNode).width);
  var bar_width = Math.floor((html_audio.currentTime * scren_width)/html_audio.duration);
  progress.style.width = bar_width + 'px';
}

function parseTime(currentTime, totalTime){
  var currentMins = (currentTime / 60).toFixed(2);
  var currentSecs = (currentMins - Math.floor(currentMins)) * 60;

  var strMins = ((Math.floor(currentMins) + '').length == 1) ? '0' + Math.floor(currentMins) : Math.floor(currentMins);
  var strSecs = ((Math.floor(currentSecs) + '').length == 1) ? '0' + Math.floor(currentSecs) : Math.floor(currentSecs);

  var totalMins = (totalTime / 60).toFixed(2);
  var totalSecs = (totalMins - Math.floor(totalMins)) * 60;

  var strTotalMins = ((Math.floor(totalMins) + '').length == 1) ? '0' + Math.floor(totalMins) : Math.floor(totalMins);
  var strTotalSecs = ((Math.floor(totalSecs) + '').length == 1) ? '0' + Math.floor(totalSecs) : Math.floor(totalSecs);

  if(strTotalMins + '' == 'NaN')
    return strMins + ':' + strSecs + '/--:--';
  else {
    return strMins + ':' + strSecs + '/' + strTotalMins + ':' + strTotalSecs;
  }
}

function parsePixels(px){
  return px.substring(0, px.length - 2);
}

function displayPlaylist(show){
  if(show) {
    html_playlist.className = 'showlist';
  }else{
     html_playlist.className = '';
  }
}

function clearBolds(){
  var items = html_playlist.children;
  for(k = 0; k < items.length; k++)    items[k].style.fontWeight = 'normal';
}
