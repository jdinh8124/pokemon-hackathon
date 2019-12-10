class GameBoard{
  constructor(){
    this.player1Pokemon = null;
    this.player2Pokemon = null;
    this.pokemonPool = [];
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
    this.playerNumber++;
    var pokemon2 = this.createPokemon();
    this.playerNumber++;
    var pokemon3 = this.createPokemon();
    this.playerNumber++;
    var pokemon4 = this.createPokemon();
    this.playerNumber++;
    var pokemon5 = this.createPokemon();
    this.playerNumber++;
    var pokemon6 = this.createPokemon();


    //pokemon renders
    this.pokemonPool.push(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6);
    console.log(this.pokemonPool);
  }

  createPokemon() {
    var pokeId = this.randomPokemonNumber();

    var pokemon = new Pokemon(this.playerNumber, pokeId, this.addPokemonToArena);
    return pokemon;
  }

  handleKeyPress(event){
    if(event.key == "p"){
      this.pokemonBattle(this.pokemonToFight[0], this.pokemonToFight[1]);
    }
  }

  addPokemonToArena(pokemon){
    this.pokemonToFight.push(pokemon);
    pokemon.toGameBoard();
    console.log(pokemon.name + " is ready to fight!");
    if (this.pokemonToFight.length === 2){
      console.log("ready! p to fight");
    }
  }



  randomPokemonNumber(){
   return Math.floor(Math.random() * 10 + 1);
  }

  pokemonBattle(pokemon1, pokemon2){

    console.log(pokemon1, pokemon2);
    var pokemon1Damge = pokemon1.attack - Math.floor(pokemon2.defense/3);
    var pokemon2Damge = pokemon2.attack - Math.floor(pokemon1.defense / 3);

    if(pokemon1.speed > pokemon2.speed){
      console.log(pokemon1.name + " attacked!");
      pokemon2.hp -= pokemon1Damge;
      console.log(pokemon2.name + " hp: " + pokemon2.hp);

      console.log(pokemon2.name + " attacked!");
      pokemon1.hp -= pokemon2Damge;
      console.log(pokemon1.name + " hp: " + pokemon1.hp);
    } else {
      console.log(pokemon2.name + " attacked!");
      pokemon1.hp -= pokemon2Damge;
      console.log(pokemon1.name + " hp: " + pokemon1.hp);

      console.log(pokemon1.name + " attacked!");
      pokemon2.hp -= pokemon1Damge;
      console.log(pokemon2.name + " hp: " + pokemon2.hp);
    }
    var current = this;
    setTimeout(function(){
      current.battleAgain(pokemon1, pokemon2);
    }, 1000);
  }

  battleAgain(pokemon1, pokemon2){
    if (pokemon1.hp > 0 && pokemon2.hp > 0) {
      console.log("round2");
      this.pokemonBattle(pokemon1, pokemon2);
    } else {
      this.endFight(pokemon1, pokemon2);
    }
  }

  endFight(pokemon1, pokemon2){
    this.pokemonToFight = [];
    if(pokemon1.hp >= pokemon2.hp){
      console.log(pokemon1.name+" wins");
    } else {
      console.log(pokemon2.name +" wins");
    }
  }

}
