$(document).ready(initializeApp);

function initializeApp(){
  var game = new GameBoard();
  game.gameSetup();
}

function startTacoVideo(){
  $("iframe").attr('src', "https://www.youtube.com/embed/npjF032TDDQ?&autoplay=1")
}
