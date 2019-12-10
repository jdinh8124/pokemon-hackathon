class GameBoard{
  constructor(){
    this.player1Pokemon = null;
    this.player2Pokemon = null;
    this.pokemonToFight = [];
    this.playerNumber = 1;

    this.addPokemonToArena = this.addPokemonToArena.bind(this);
    this.pokemonBattle = this.pokemonBattle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    $('html').on("keydown", this.handleKeyPress);
  }

  gameSetup(){
    //placeholder name for now
    var pokemon1 = this.createPokemon();
    var pokemon2 = this.createPokemon();

    //pokemon renders
    this.addPokemonToArena(pokemon1, pokemon2);
  }

  handleKeyPress(event){
    if(event.key == "x"){
      this.pokemonBattle(this.pokemonToFight[0], this.pokemonToFight[1]);
    }
  }

  addPokemonToArena(pokemon1, pokemon2){
    this.pokemonToFight.push(pokemon1, pokemon2);

    if (this.pokemonToFight.length === 2){
      console.log("ready! x to fight");
    }
  }

  createPokemon(){
    var pokeId = this.randomPokemonNumber();

    var pokemon = new Pokemon(this.playerNumber, pokeId);
    return pokemon;
  }

  randomPokemonNumber(){
   return Math.floor(Math.random() * 10 + 1);
  }

  pokemonBattle(pokemon1, pokemon2){


    console.log(pokemon1, pokemon2);
    if(pokemon1.speed > pokemon2.speed){
      console.log("pokemon 1 attacked!");
      pokemon2.hp -= pokemon1.attack;
      console.log("pokemon 2 hp: " + pokemon2.hp);

      console.log("pokemon 2 attacked!");
      pokemon1.hp -= pokemon2.attack;
      console.log("pokemon 1 hp: " + pokemon1.hp);
    } else {
      console.log("pokemon 2 attacked!");
      pokemon1.hp -= pokemon2.attack;
      console.log("pokemon 1 hp: " + pokemon1.hp);
      console.log("pokemon 1 attacked!");
      pokemon2.hp -= pokemon1.attack;
      console.log("pokemon 2 hp: " + pokemon2.hp);
    }
    var current = this;
    setTimeout(function(){
      current.battleAgain(pokemon1, pokemon2);
    }, 1000);
  }

  battleAgain(pokemon1, pokemon2){
    if (pokemon1.health > 0 && pokemon2.health > 0) {
      console.log("round2");
      this.pokemonBattle(pokemon1, pokemon2);
    } else {
      this.endFight(pokemon1, pokemon2);
    }
  }

  endFight(pokemon1, pokemon2){
    this.pokemonToFight = [];
    if(pokemon1.health === 0){
      console.log("player 2 win");
    } else {
      console.log("player 1 win");
    }
  }

}