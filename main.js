$(document).ready(initializeApp);

function initializeApp(){
  var game = new GameBoard();
  game.gameSetup();

  var taco = new Taco
  taco.getTacoFromServer();



  var weather = new Weather(-26.2051, 28.0497)

}

// function coords(event){
// var maps = new Maps(80, -120)
// }
function startTacoVideo(){
  $("iframe").attr('src', "https://www.youtube.com/embed/npjF032TDDQ?&autoplay=1")
}
