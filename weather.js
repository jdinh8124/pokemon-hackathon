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

    this.getWeatherFromServer = this.getWeatherFromServer.bind(this);
    this.getWeatherFromServer(this.location);
}



  getWeatherFromServer() {
    $.ajax({
      dataType: "json",
      url: "api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lon,
      method: "GET",
      headers: {
        "X-Access-Token": "885cf57956d026ee2398f97d86e38437"
      },
      success: this.renderWeathersuccess,
      error: this.renderWeatherFail,

    })
  }

  renderWeathersuccess(response){
    console.log(response);
  }

  renderWeatherFail(response){
    console.log(response.responseText);
  }

}
