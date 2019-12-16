class Maps {
  constructor(latitude, longitude, location, mapZoom) {
    this.mapCoordinates = {
      lat: latitude,
      lng: longitude
    }
    this.location = location;
    this.mapZoom = mapZoom;
    this.createLocationDiv = null;

  }
  render = () => {
    this.createLocation = $("<div>")
    this.createLocation = $("<div>").attr("id", this.location);
    $(".displayMap").append(this.createLocation);
    this.loadMap();
  }

  loadMap = () => {
    const coordinates = this.mapCoordinates;
    const map = new google.maps.Map(document.getElementById(this.location), {
      zoom: this.mapZoom,
      center: coordinates
    });
    const mapMarker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
  }
}
