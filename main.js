$(document).ready(initializeApp);

function initializeApp(){
  var game = new GameBoard();
  game.gameSetup();
  var taco = new Taco
  taco.getTacoFromServer();


}

function startTacoVideo(){
  $("iframe").attr('src', "https://www.youtube.com/embed/npjF032TDDQ?&autoplay=1")
}
