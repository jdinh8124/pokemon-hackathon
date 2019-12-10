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
    this.backgroundImages()
    // clouds, rain, clear
  }

  renderWeatherFail(response){
    console.log(response.responseText);
  }

  backgroundImages() {

    debugger;
    if (this.weather === "clouds") {
      $("body").css("background-image", "./assets/173154.jpg")
    } else if (this.weather === "rain") {
      $("body").css("background-image", "./assets/173154.jpg")
    } else {
      $("body").css("background-image", "assets/173154.jpg")
      console.log(this.weather);
    }
  }


}
