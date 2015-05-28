$(document).ready(function() {
 
  SC.initialize({
    client_id: "48d24d3154983609a7bc89b5415c84e1"
  });
  
  startGame();
    
});

var Game = {  
  isPlaying: false,
  score:0
  

};

function startGame() {
 // var username = prompt("Please type your USERNAME !");
  loadSong(175074716);
}

function loadSong(id) { 
 var track_url = '/tracks/' + id;
  SC.stream(track_url, function(sound) {
    console.log(sound);
    Game.track = sound;
    switch (id) {
       case 7991649:
        Game.bpm = 130;
        break;
      case 175074716:
        Game.bpm = 130;
        break;
      case 175249723:
        Game.bpm = 130;
        break;
      case 182866694:
        Game.bpm = 68;
        break;
      case 102106214:
        Game.bpm = 105;
        break;
      case 158305649:
        Game.bpm = 94;
        break;        
    }

  });
} 

function playGame() {
  if(Game.isPlaying === false) {
    Game.isPlaying = true;
    Game.beatInterval = setInterval(moveBeats, 58);
    Game.trackInterval = setInterval(addBeat, 60 * 1000 / Game.bpm );
    Game.track.play();
  }
}

function pauseGame() {
  Game.isPlaying = false;
  Game.track.pause();
  clearInterval(Game.beatInterval);
  clearInterval(Game.trackInterval);
}
function stopGame() {
  Game.isPlaying = false;
  Game.track.stop();
  clearInterval(Game.beatInterval);
  clearInterval(Game.trackInterval);
}


function addBeat() {
  var tracks = [1, 2, 3, 4];
  var beats = ['a', 'b', 'c', 'd'];
  
  var randomNumber = Math.floor(Math.random() * 4);
  
  var beat = '<div class="beat beat-' + beats[randomNumber] +  '"></div>';
  var track = $("#track" + tracks[randomNumber]);
  track.prepend(beat);
}

function moveBeats(){

  $(".beat").each(function(){
    
    var currentPosition = $(this).position().top;
    if (currentPosition > (window.innerHeight + 100)) {
      $(this).remove();
      removePoints()
    } else {
//     console.log(currentPosition);
      $(this).css({
        top: currentPosition + 60 + "px"
      })

      if (currentPosition + $(this).height() > $(".track").height()){
        $(this).addClass("disabled").removeClass("enabled");
      } else if (currentPosition + $(this).height() > $(".track").height() - 125){
        $(this).addClass("enabled");
      }
    }
    
  })
  
}

function addPoints() {
  Game.score+= 100;
  $("#scoreBoard h2").text(Game.score);
 if (Game.score >10000){
  winGame(); 
 }
}
function removePoints() {
  Game.score-= 25;
  $("#scoreBoard h2").text(Game.score);
  if(Game.score < -300){
    failGame();
  }
}

function bopButton($target){
 var beats = $target.parents(".track").find(".beat.enabled");
  if (beats.length > 0){
    addPoints();
    $(beats).remove();
    
  } else {
    removePoints();
    var scratchSound = new Audio('/sounds/scratch.mp3');
    scratchSound.play();
  }
  $target.addClass("button-large");
  $target.parent().parent().addClass("track-light");
  setTimeout(function(){
     $target.removeClass("button-large");        
      $target.parent().parent().removeClass("track-light");
  }, 100);
}
//   var myInterval = setInterval(bopButtons, 500);
$(".button").click(function(){
  bopButton($(this));
});
$("#try_again").click(function(){
  $(".modal.fail").addClass("hidden");
  $(".modal.win").addClass("hidden");
  Game.score = 0;
});

$(document).keypress(function(e){
  console.log(e.which);
  switch(e.which){
    case 97:
      bopButton($(".button1"));
      break;
   case 115:
      bopButton($(".button2"));
      break;
   case 107:
      bopButton($(".button3"));
      break;
   case 108:
      bopButton($(".button4"));
      break;
  }
});

function failGame(){
  stopGame();
  var failSound = new Audio('/sounds/fail.wav');
  failSound.play();
  $(".modal.fail").removeClass("hidden");
}

function winGame(){
    stopGame();

  var winSound = new Audio('/sounds/win.mp3');
  winSound.play();
  $(".modal.win").removeClass("hidden");
}

