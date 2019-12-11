$(document).ready(initializeApp);

function initializeApp() {
  var game = new GameBoard();
  game.gameSetup();

  // $('.startModal').removeClass('hidden');
  $('.mapList').on('click', dropDownList);
  $('.active').on('click', ".locationChoice", clickOnMapLocation);

  var taco = new Taco
  taco.getTacoFromServer();


  var weather = new Weather(34.052235, -118.2445)

  // var weather = new Weather(-26.2051, 28.0497)

}

function startTacoVideo() {
  $("iframe").attr('src', "https://www.youtube.com/embed/npjF032TDDQ?&autoplay=1")
}

/*** front modal stuff ***/
function dropDownList() {
  $('ul').toggleClass('active');
}


function clickOnMapLocation(event) {
  $('.displayMap').empty();
  var locationClick = $(event.currentTarget);
  var city = locationClick.attr('id');
  selectMap(city);

}

function selectMap(city) {
  switch (city) {
    case 'LA':
      var location1 = new Maps(34.0549, -118.2445, 'staplesCenter', 15);
      location1.render();
      break;
    case 'NYC':
      var location2 = new Maps(40.7306, -73.9867, 'rockefellerCenter', 15);
      location2.render();
      break;
    case 'tokyo':
      var location3 = new Maps(35.6828, 139.759, 'tokyoCentral', 15);
      location3.render();
      break;
    case 'SF':
      var location4 = new Maps(37.7793, -122.4193, 'goldenGateBridge', 15);
      location4.render();
      break;
    case 'paris':
      var location5 = new Maps(48.8566, 2.3515, 'eiffelTower', 15);
      location5.render();
      break;
    case 'southAfrica':
      var location6 = new Maps(-26.2051, 28.0497, 'johannesburg', 15);
      location6.render();
      break;
    case 'southAmerica':
      var location7 = new Maps(-28.6681, -49.3384, 'iguazuFalls', 15);
      location7.render();
      break;
    case 'southKorea':
      var location8 = new Maps(37.5667, 126.9783, 'seoul', 15);
      location8.render();
      break;
    case 'london':
      var location9 = new Maps(51.5073, -0.1277, 'bigBen', 15);
      location9.render();
      break;
    case 'irvine':
      var location10 = new Maps(37.7006, -83.9739, 'learningFuze', 15);
      location10.render();
      break;

  }
}
