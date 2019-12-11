class Pokemon{
  constructor(
    playerNum,
    randomPokeNum,
    addToArena = () => { }
    )
{
  this.playerNum = playerNum;
  this.randomPokeNum = randomPokeNum;
  this.name = null;
  this.attack = null;
  this.specialAttack = null;
  this.frontSprite = null;
  this.backSprite = null;
  this.speed = null;
  this.hp = null;
  this.specialDefense = null;
  this.defense = null;
  this.experience = null;
  this.elementType = null;
  this.elementInfo = null
  this.addToArena = addToArena;

  this.renderPokemon = this.renderPokemon.bind(this);
  this.getPokemonFromServer = this.getPokemonFromServer.bind(this);
  this.getPokemonFromServer(this.randomPokeNum);
}

  getPokemonFromServer(){
    $.ajax({
      dataType :"json",
      url: "https://pokeapi.co/api/v2/" +"pokemon/" + this.randomPokeNum,
      method: "GET",
      success: this.renderPokemon,
      error: this.processPokemonError,

    })

  }


  renderPokemon(response) {
    // console.log(response);
    this.name = response.name;
    this.name = response.name.charAt(0).toUpperCase() + response.name.slice(1)
    this.attack = response.stats[4].base_stat;
    this.specialAttack = response.stats[2].base_stat;
    this.frontSprite = response.sprites.front_default;
    this.backSprite = response.sprites.back_default;
    this.speed = response.stats[0].base_stat;
    this.hp = response.stats[5].base_stat;
    this.specialDefense = response.stats[1].base_stat;
    this.defense = response.stats[3].base_stat;

    this.experience = response.base_experience;
    this.elementType = response.types[0].type.name;
    this.elementInfo = response.types[0].type.url;

    //recursive func to ensure pokemon is not evolved
    if(this.experience > 70){
      this.randomPokeNum+=1;
      this.getPokemonFromServer();
      return;
    }else{
      this.render();
      return;
    }


  }


  processPokemonError(response) {
    console.log(response.responseText);
  }

  render(){
    var current = this;
    var thisPokemon = this.getStats();
    $("#icon" + this.playerNum)
      .css("background-image", 'url(' + this.frontSprite + ')')
      .on("click", function () {
        current.addToArena(thisPokemon);
      });

//uncomment below to have bottom row back facing sprites instead of all front facing

    // if(this.playerNum % 2 === 0){

    //   $("#icon"+this.playerNum)
    //   .css("background-image", 'url(' + this.backSprite + ')')
    //   .on("click", function(){
    //     current.addToArena(thisPokemon);
    //   });

    // } else {
    //   $("#icon" + this.playerNum)
    //   .css("background-image", 'url(' + this.frontSprite + ')')
    //   .on("click", function () {
    //     current.addToArena(thisPokemon);
    //   });
    // }
  }

  toGameBoard(){
    // var pokemonToField = $("<div>")
    // .css("background-image", 'url(' + this.frontSprite + ')')
    // .addClass("pokemonInArena");


    if(this.playerNum % 2 === 0){
      $(".p2Fighter1")
      .toggleClass("hidden")
      .css("background-image", 'url(' + this.backSprite + ')');
      $(".topHPBar").text(this.hp).css("width", "80%");
    } else {
      $(".p1Fighter1")
      .toggleClass("hidden")
      .css("background-image", 'url(' + this.frontSprite + ')');
      $(".bottomHPBar").text(this.hp).css("width", "80%");
    }
  }

  getStats(){

    var pokeStats = {
    playerNum: this.playerNum,
    name : this.name,
    attack : this.attack,
    specialAttack : this.specialAttack,
    frontSprite : this.frontSprite,
    backSprite: this.backSprite,
    speed : this.speed,
    hp: this.hp,
    specialDefense: this.specialDefense,
    defense: this.defense,
    toGameBoard: this.toGameBoard
    }
    return pokeStats;
  }
}
