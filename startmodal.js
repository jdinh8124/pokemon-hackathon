class BegModal {
    constructor () {
      this.render = this.render.bind(this);
      this.dropDownList = this.dropDownList.bind(this);
      this.clickOnMapLocation = this.clickOnMapLocation.bind(this);
      this.selectMap = this.selectMap.bind(this);

      this.fiveSecCountdown = this.fiveSecCountdown.bind(this);
      this.timeLeft = 3;
      this.timer = null;

      $('.startModal').removeClass('hidden');
      $('.pokedex').addClass('hidden');
      $('.mapList').on('click', this.dropDownList);
      $('.battleField').on('click', ".locationChoice", this.clickOnMapLocation);
      $('.playButton').on('click', this.displayMapList);

      this.intervalId;
    }

    render(){
      $('.playButton').addClass('animateText');
    }

    displayMapList(){
      $('.playButton').css('opacity', '10%');
      $('.pokedex').removeClass('hidden');
      $('.playButton').removeClass('animateText');
    }

    dropDownList() {
      $('ul').toggleClass('battleField');
    }


    clickOnMapLocation(event) {
      $('.displayMap').empty();
      $('.playButton').addClass('animateText');
      var locationClick = $(event.currentTarget);
      var city = locationClick.attr('id');
      this.selectMap(city);

      $('.listOfMapLocations').addClass('hidden');

      $('.playButton').css('opacity','100%')
      this.fiveSecCountdown();
      this.timer = setInterval(this.fiveSecCountdown, 1000);

      setTimeout(function () {
        $('.startModal').addClass('hidden');
      }, 5000);
    }


    fiveSecCountdown(){
      const playButton = $('.playButton')
      if (this.timeLeft == -1){
        clearTimeout(this.timer)
      } else {
        $('.playButton').text(this.timeLeft);
        this.timeLeft--;
      }
      if (playButton.text() === '0') {
        playButton.text('GET READY');
      }
    }

    selectMap(city) {
      switch (city) {
        case 'LA':
          var location1 = new Maps(34.044227, -118.267254, 'staplesCenter', 15);
          location1.render();
          var weather = new Weather(34.044227, -118.267254)
          break;
        case 'NYC':
          var location2 = new Maps(40.7306, -73.9867, 'rockefellerCenter', 15);
          location2.render();
          var weather = new Weather(40.7306, -73.9867)
          break;
        case 'tokyo':
          var location3 = new Maps(35.6828, 139.759, 'tokyoCentral', 15);
          location3.render();
          var weather = new Weather(35.6828, 139.759)
          break;
        case 'SF':
          var location4 = new Maps(37.820090, -122.477654, 'goldenGateBridge', 13);
          location4.render();
          var weather = new Weather(37.820090, -122.477654)
          break;
        case 'antarctica':
          var location5 = new Maps(-76.282679, 22.190994, 'antarctica', 2);
          location5.render();
          var weather = new Weather(-76.282679, 22.190994)
          break;
        case 'southAfrica':
          var location6 = new Maps(-26.2051, 28.0497, 'johannesburg', 15);
          location6.render();
          var weather = new Weather(-26.2051, 28.0497)
          break;
        case 'southAmerica':
          var location7 = new Maps(-25.689901, -54.441011, 'iguazuFalls', 13);
          location7.render();
          var weather = new Weather(-25.689901, -54.441011)
          break;
        case 'southKorea':
          var location8 = new Maps(37.5667, 126.9783, 'seoul', 15);
          location8.render();
          var weather = new Weather(37.5667, 126.9783)
          break;
        case 'london':
          var location9 = new Maps(51.5073, -0.1277, 'bigBen', 15);
          location9.render();
          var weather = new Weather(51.5073, -0.1277)
          break;
        case 'irvine':
          var location10 = new Maps(33.635196, -117.740545, 'learningFuze', 15);
          location10.render();
          var weather = new Weather(33.635196, -117.740545)
          break;
      }
    }
}
