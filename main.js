$(document).ready(initializeApp);

function initializeApp() {
  var game = new GameBoard();
  game.gameSetup();
  var startingModal = new BegModal ();
  var taco = new Taco
  taco.getTacoFromServer();

}
