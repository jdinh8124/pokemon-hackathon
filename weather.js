class Weather{
  constructor(
    lat,
    lon
  )
{
  this.lat = lat;
  this.lon = lon;
  this.wind = null;
  this.weather = null;
  this.background = null;

    this.getWeatherFromServer = this.getWeatherFromServer.bind(this);
    this.renderWeathersuccess = this.renderWeathersuccess.bind(this);
    this.getWeatherFromServer();
}



  getWeatherFromServer() {
    var key = "885cf57956d026ee2398f97d86e38437";
    $.ajax({
      dataType: "json",
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lon + "&APPID=" + key,
      method: "GET",
      // data: {
      //   APPID:
      // },
      success: this.renderWeathersuccess,
      error: this.renderWeatherFail,

    })
  }

  renderWeathersuccess(response){
    console.log(response);
    this.wind = response.wind.speed;
    this.weather = response.weather[0].main;
    this.cityBackground();
    this.weatherModal();
    // clouds, rain, clear
  }

  renderWeatherFail(response){
    console.log(response.responseText);
  }
  weatherModal() {
    if (this.weather === "Clouds") {
      $(".gameContainer").addClass("weather rain");
      $(".weatherStats").append(weatherImg)
    } else if (this.weather === "Rain") {
      $(".gameContainer").addClass("weather rain");
      $(".weatherStats").append(weatherImg)
    } else if (this.weather === "Snow"){
      $(".gameContainer").addClass("weather snow");
      $(".weatherStats").append(weatherImg)
    }
    else {
      $(".gameContainer").addClass("weather rain");
      $(".weatherStats").append(weatherImg)
    }
  }
  cityBackground(){
    //LA STAPLE CENTER
    if (this.lat === 34.052235 && this.lon === -118.2445) {
      $(".gameContainer").css("background-image", 'url(' + "assets/STAPLESCenternight.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    }  //NYC Rockerfeller
    else if (this.lat === 40.7306 && this.lon ===  -73.9867) {
      $(".gameContainer").css("background-image", 'url(' + "assets/newYork.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } // Tokyo
     else if (this.lat === 35.6828 && this.lon === 139.759){
      $(".gameContainer").css("background-image", 'url(' + "assets/tokyo.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } //SF Bridge
    else if (this.lat === 37.7793 && this.lon === -122.4193) {
      $(".gameContainer").css("background-image", 'url(' + "assets/GoldenGateBridge-001.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    } // Paris - eiffel Tower
    else if (this.lat === 48.8566 && this.lon === 2.3515){
      //Johannesburg
      $(".gameContainer").css("background-image", 'url(' + "assets/paris.jpg " + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } //Brazil Igazu Falls
     else if (this.lat === -26.2051 && this.lon === 28.0497) {
     //South Korea
      $(".gameContainer").css("background-image", 'url(' + "assets/johan.jpg " + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } //London
    else if (this.lat === -28.6681 && this.lon === -49.3384) {
      $(".gameContainer").css("background-image", 'url(' + "assets/iguazu.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    } else if (this.lat === 37.5667 && this.lon === 126.9783) {
      $(".gameContainer").css("background-image", 'url(' + "assets/seoul.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } else if (this.lat === 51.5073 && this.lon === -0.1277) {
      $(".gameContainer").css("background-image", 'url(' + "assets/London.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    } else if (this.lat === 37.7006 && this.lon === -83.9739) {
      $(".gameContainer").css("background-image", 'url(' + "assets/irvine.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    }
  }
}
