class Pokemon{
  constructor(
    playerNum,
    randomPokeNum
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
  this.elementType = null;
  this.elementInfo = null

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
    this.attack = response.stats[4].base_stat;
    this.specialAttack = response.stats[2].base_stat;
    this.frontSprite = response.sprites.front_default;
    this.backSprite = response.sprites.back_default;
    this.speed = response.stats[0].base_stat;
    this.hp = response.stats[5].base_stat;
    this.specialDefense = response.stats[1].base_stat;
    this.defense = response.stats[3].base_stat;

    this.elementType = response.types[0].type.name;
    this.elementInfo = response.types[0].type.url;

    this.render();
  }


  processPokemonError(response) {
    console.log(response.responseText);
  }

  render(){
    if(this.playerNum % 2 === 0){
      $("#icon"+this.playerNum).css("background-image", 'url(' + this.backSprite + ')');
    } else {
      $("#icon" + this.playerNum).css("background-image", 'url(' + this.frontSprite + ')');
    }
  }
  getStats(){
    var pokeStats = {
    name : this.name,
    attack : this.attack,
    specialAttack : this.specialAttack,
    frontSprite : this.frontSprite,
    backSprite: this.backSprite,
    speed : this.speed,
    hp: this.hp,
    specialDefense: this.specialDefense,
    defense: this.defense
    }
    return pokeStats;
  }
}
