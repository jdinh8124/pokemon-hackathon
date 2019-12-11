class GameBoard{
  constructor(){
    this.player1Pokemon = null;
    this.player2Pokemon = null;
    this.pokemonPool = [];
    this.pokemonToFight = [];
    this.playerNumber = 1;
    this.backgroundMusic = new Audio("assets/pokemonbattle.mp3");
    this.attackSound = new Audio("assets/Slam.wav");
    this.dyingSound = new Audio("assets/SilvallyFaintingCry.mp3")
    this.nextRound = this.nextRound.bind(this);
    this.addPokemonToArena = this.addPokemonToArena.bind(this);
    this.pokemonBattle = this.pokemonBattle.bind(this);
    this.player1Wins = 0;
    this.player2Wins = 0;
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    // $('html').on("keydown", this.handleKeyPress);
    $(".restartButton").on("click", this.nextRound);
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

  prepBattle(){

    this.backgroundMusic.play();
    console.log("waiting on music")

    var turn = 0;
    if (this.pokemonToFight[0].speed > this.pokemonToFight[1].speed){
      turn = 1;
    } else {
      turn = 2;
    }
    $(".textModalContent").text("The Battle will begin now!");
    var toBattle = this;
    setTimeout(function(){
      toBattle.pokemonBattle(toBattle.pokemonToFight[0], toBattle.pokemonToFight[1], turn);
    }, 1500);

  }

  addPokemonToArena(pokemon){

    this.pokemonToFight.push(pokemon);

    console.log(pokemon.playerNum);
    if(pokemon.playerNum % 2 !== 0){
      $("#icon"+1).off("click").addClass("unselectable");
      $("#icon" + 3).off("click").addClass("unselectable");
      $("#icon" + 5).off("click").addClass("unselectable");
    } else{
      $("#icon" + 2).off("click").addClass("unselectable");
      $("#icon" + 4).off("click").addClass("unselectable");
      $("#icon" + 6).off("click").addClass("unselectable");
    }
    $("#icon" + pokemon.playerNum).addClass("selected").removeClass("shadowed");
    pokemon.toGameBoard();
    console.log(pokemon.name + " is ready to fight!");
    if (this.pokemonToFight.length === 2){
      this.prepBattle();
    }
  }



  randomPokemonNumber(){
   return Math.floor(Math.random() * 20 + 1);
  }

  pokemonBattle(pokemon1, pokemon2, turn){
    // console.log(pokemon1, pokemon2);
    var pokemon1Damage = pokemon1.attack - Math.floor(pokemon1.defense / 1.5);
    var pokemon2Damage = pokemon2.attack - Math.floor(pokemon1.defense / 1.5);
    if (pokemon1Damage <= 0){
      pokemon1Damage = 2;
    }
    if (pokemon2Damage <= 0) {
      pokemon2Damage = 2;
    }

    var battleText = $("<div>");
    console.log(turn);

    if(turn === 1){

      $("#p1Fighter1").toggle();
      $("#p1Fighter1").toggle();

      this.attackSound.play();

      $(".textModalContent").text(pokemon1.name + " attacked " + pokemon2.name + " for " + pokemon1Damage + " damage.");
      pokemon2.hp -= pokemon1Damage;
      console.log(pokemon2.name + " hp: " + pokemon2.hp);


      $(".bottomHPBar").css("width", pokemon2.hp + "%");
      $(".bottomHPBar").text(pokemon2.hp);

    } else if (turn === 2){

      $("#p2Fighter1").toggle();
      $("#p2Fighter1").toggle();
      
      this.attackSound.play();

      $(".textModalContent").text(pokemon2.name + " attacked " + pokemon1.name + " for " + pokemon2Damage + " damage.");
      pokemon1.hp -= pokemon2Damage;
      console.log(pokemon1.name + " hp: " + pokemon1.hp);

      $(".topHPBar").css("width", pokemon1.hp + "%");
      $(".topHPBar").text(pokemon1.hp);

    }

    var current = this;
    setTimeout(function () {
      current.checkFaint(pokemon1, pokemon2, turn);
    }, 1500);
  }

  checkFaint(pokemon1, pokemon2, turn){
    if (pokemon1.hp > 0 && pokemon2.hp > 0) {
      console.log("round2");
      if(turn === 1){

        turn++;
      } else {
        turn--;
      }
      this.pokemonBattle(pokemon1, pokemon2, turn);
    } else {
      this.dyingSound.play();
      this.endFight(pokemon1, pokemon2);

    }

  }

  endFight(pokemon1, pokemon2){
    this.backgroundMusic.pause();
    this.pokemonToFight = [];
    this.pokemonPool = [];
    if(pokemon1.hp >= pokemon2.hp){
      console.log(pokemon1.name+"! Player 1 wins");
      $(".textModalContent").text(pokemon1.name + " wins! Nice work, Player 1");
      this.player1Wins++;
      $(".player1Stats").text(this.player1Wins);
    } else {
      console.log(pokemon2.name +"! Player 2 wins");
      $(".textModalContent").text(pokemon2.name + " wins! Good job, Player 2");
      this.player2Wins++;
      $(".player2Stats").text(this.player2Wins);
    }
    $(".winModal").toggleClass("hidden");
    $(".tacoModal").toggleClass("hidden");
    $(".restartButton").toggleClass("hidden");
  }

  nextRound(){
    this.playerNumber = 1;
    console.log("asdf");
    $(".winModal").toggleClass("hidden");
    $(".tacoModal").toggleClass("hidden");
    $(".restartButton").toggleClass("hidden");
    $(".pokeIcon").removeClass("unselectable");
    $(".pokeIcon").removeClass("selected");
    $(".p1Fighter1").toggleClass("hidden");
    $(".p2Fighter1").toggleClass("hidden");
    this.gameSetup();
  }


}
