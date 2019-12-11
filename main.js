$(document).ready(initializeApp);

function initializeApp() {
  var game = new GameBoard();
  game.gameSetup();

  var startingModal = new BegModal ();

  var taco = new Taco
  taco.getTacoFromServer();

}

function startTacoVideo() {
  $("iframe").attr('src', "https://www.youtube.com/embed/npjF032TDDQ?&autoplay=1")
}
