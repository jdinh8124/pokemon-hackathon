$(document).ready(initializeApp);

function initializeApp(){
  var game = new GameBoard();
  game.gameSetup();
  var weather = new Weather(33.6857, -117.826);
}
