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
    this.activateUzair = this.activateUzair.bind(this);
    this.weatherCondition = $(".weatherImg").attr("src");

    this.addPokemonToArena = this.addPokemonToArena.bind(this);
    this.pokemonBattle = this.pokemonBattle.bind(this);
    this.player1Wins = 0;
    this.player2Wins = 0;

    //battle things
    this.ifCrit = "";
    this.p1typeWeakness = null;
    this.p2typeWeakness = null;
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    // $('html').on("keydown", this.handleKeyPress);
    $(".topTrainerIconBox").on("click", this.activateUzair);
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

    // this.pokemonToFight.push(pokemon);

    console.log(pokemon.playerNum);
    if(pokemon.playerNum % 2 !== 0){
      $("#icon"+1).off("click").addClass("unselectable");
      $("#icon" + 3).off("click").addClass("unselectable");
      $("#icon" + 5).off("click").addClass("unselectable");
      this.pokemonToFight[0] = pokemon;
    } else{
      $("#icon" + 2).off("click").addClass("unselectable");
      $("#icon" + 4).off("click").addClass("unselectable");
      $("#icon" + 6).off("click").addClass("unselectable");
      this.pokemonToFight[1] = pokemon;
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
    this.ifCrit = "";
    var pokemon1Atk = this.checkAttackStat(pokemon1); //[atk, type to defend]
    var pokemon2Atk = this.checkAttackStat(pokemon2);


    if(turn === 1){
      var pokemon1Damage = this.pokemonDamage(pokemon1, pokemon2, pokemon1Atk);
      $("#p1Fighter1").toggle();
      $("#p1Fighter1").toggle();

      this.attackSound.play();

      $(".textModalContent").text(this.ifCrit + pokemon1.name + " attacked " + pokemon2.name + " for " + pokemon1Damage + " damage.");
      pokemon2.hp -= pokemon1Damage;
      console.log(pokemon2.name + " hp: " + pokemon2.hp);


      $(".bottomHPBar").css("width", pokemon2.hp + "%");
      $(".bottomHPBar").text(pokemon2.hp);

    } else if (turn === 2){
      var pokemon2Damage = this.pokemonDamage(pokemon2, pokemon1, pokemon2Atk);
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

  checkAttackStat(pokemon){
    if(pokemon.attack >= pokemon.specialAttack){
      return [pokemon.attack, "defense"];
    } else {
      return [pokemon.specialAttack, "specialDefense"];
    }
  }

  pokemonDamage(attackingPokemon, defendingPokemon, attackingInfo){
    var damage = Math.floor(7 * (attackingInfo[0] / defendingPokemon[attackingInfo[1]]));
    var critHit = this.isCrit();
    // var extraTypeDamage = this.isWeak(defendingPokemon);
    if(critHit){
      console.log("crit");
      return Math.floor(damage*1.5);
    } else {
      return damage;
    }
  }

  isCrit(){
    var randomChance = Math.floor(Math.random() * 10 + 1);
    if(randomChance === 6){
      this.ifCrit = "Critical Hit! ";
      return true;
    } else {
      this.ifCrit = "";
      return false;
    }
  }

  isWeak(defendingPokemon){
    if (defendingPokemon.playerNum % 2 === 0){
      for(let typeIndex = 0; typeIndex < defendingPokemon.weakness.length; typeIndex++){
        if(this.p2typeWeakness[typeIndex].name === defendingPokemon.type){
          console.log("WEAK");
        }
      }
    } else {
      for (let typeIndex = 0; typeIndex < defendingPokemon.weakness.length; typeIndex++) {
        if (this.p1typeWeakness[typeIndex].name === defendingPokemon.type) {
          console.log("WEAK");
        }
      }
    }
  }

  checkFaint(pokemon1, pokemon2, turn){
    if (pokemon1.hp > 0 && pokemon2.hp > 0) {
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

  activateUzair(){
    console.log("ACTIVATE");
    var uzairMon = {
      name: "Uzair",
      hp: 69,
      attack: 420,
      defense: 100,
      speed: 100,
      specialAttack: 69,
      specialDefense: 100,
      playerNum: 7,
      toGameBoard: this.uzairRender,

    }

    this.addPokemonToArena(uzairMon);


  }

  uzairRender(){
    $(".p1Fighter1")
      .toggleClass("hidden")
      .css("background-image", 'url("assets/uzairShieldBro.jpg")');
    $(".topHPBar").css("width", "60%").text("69");
  }


}
