class Maps {
  constructor(latitude, longitude, location, mapZoom) {
    this.mapCoordinates = {
      lat: latitude,
      lng: longitude
    }
    this.location = location;
    this.mapZoom = mapZoom;
    this.createLocationDiv = null;

    this.render = this.render.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }
  render() {
    this.createLocation = $("<div>")
    this.createLocation = $("<div>").attr("id", this.location);
    $(".displayMap").append(this.createLocation);
    this.loadMap();
  }

  loadMap() {
    var coordinates = this.mapCoordinates;
    var map = new google.maps.Map(document.getElementById(this.location), {
      zoom: this.mapZoom,
      center: coordinates
    });
    var mapMarker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
  }
}
