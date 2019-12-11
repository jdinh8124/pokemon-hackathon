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
    if (this.lat === -76.282679 && this.lon === 22.190994){
      $(".gameContainer").addClass("weather snow");
      var weatherImgSnow = $("<img>").attr("src", "assets/snow.PNG").attr("alt", "broken").addClass("weatherImg");
      $(".weatherStats").append(weatherImgSnow)
    }
    else if (this.weather === "Clouds") {
      var weatherImg = $("<img>").attr("src", "assets/cloudy.PNG").attr("alt", "broken").addClass("weatherImg");
      $(".weatherStats").append(weatherImg)
    } else if (this.weather === "Rain" || this.weather === "Mist") {
      $(".gameContainer").addClass("weather rain");
      var weatherImgRain = $("<img>").attr("src", "assets/rain.PNG").attr("alt", "broken").addClass("weatherImg");
      $(".weatherStats").append(weatherImgRain)
    } else if (this.weather === "Snow"){
      $(".gameContainer").addClass("weather snow");
      var weatherImgSnowReal = $("<img>").attr("src", "assets/snow.PNG").attr("alt", "broken").addClass("weatherImg");
      $(".weatherStats").append(weatherImgSnowReal)
    }
    else {
      var weatherImgSun = $("<img>").attr("src", "assets/sunny.PNG").attr("alt", "broken").addClass("weatherImg");
      $(".weatherStats").append(weatherImgSun)
    }
  }
  cityBackground(){
    //LA STAPLES CENTER
    if (this.lat === 34.044227 && this.lon === -118.267254) {
      $(".gameContainer").css("background-image", 'url(' + "assets/STAPLESCenternight.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    }  //NYC Rockerfeller
    else if (this.lat === 40.7306 && this.lon ===  -73.9867) {
      $(".gameContainer").css("background-image", 'url(' + "assets/newYork.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } // Tokyo
     else if (this.lat === 35.6828 && this.lon === 139.759){
      $(".gameContainer").css("background-image", 'url(' + "assets/tokyo.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } //SF Bridge
    else if (this.lat === 37.820090 && this.lon === -122.477654) {
      $(".gameContainer").css("background-image", 'url(' + "assets/GoldenGateBridge-001.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    } // Antartica - Marambio Base
    else if (this.lat === -76.282679 && this.lon === 22.190994){
      $(".gameContainer").css("background-image", 'url(' + "assets/antarctica.jpg " + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "bottom");
    } // Johannesburg
    else if (this.lat === -26.2051 && this.lon === 28.0497) {
      $(".gameContainer").css("background-image", 'url(' + "assets/johan.jpg " + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } //Iguazu Falls
    else if (this.lat === -25.689901 && this.lon === -54.441011) {
      $(".gameContainer").css("background-image", 'url(' + "assets/iguazu.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    } //Seoul
    else if (this.lat === 37.5667 && this.lon === 126.9783) {
      $(".gameContainer").css("background-image", 'url(' + "assets/seoul.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat");
    } //London
    else if (this.lat === 51.5073 && this.lon === -0.1277) {
      $(".gameContainer").css("background-image", 'url(' + "assets/London.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    } //LearningFuze
    else if (this.lat === 33.635196 && this.lon === -117.740545) {
      $(".gameContainer").css("background-image", 'url(' + "assets/lfz-background.jpg" + ')').css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position", "center");
    }
  }
}
