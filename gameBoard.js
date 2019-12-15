class GameBoard{
  constructor(){
    this.player1Pokemon = [];
    this.player2Pokemon = [];
    this.pokemonPool = [];
    this.pokemonToFight = [];
    this.backgroundMusic = new Audio("assets/pokemonbattle.mp3");
    this.attackSound = new Audio("assets/Slam.wav");
    this.dyingSound = new Audio("assets/SilvallyFaintingCry.mp3")
    this.nextRound = this.nextRound.bind(this);
    this.activateUzair = this.activateUzair.bind(this);
    this.weatherCondition = $(".weatherImg").attr("src");

    this.addPokemonToArena = this.addPokemonToArena.bind(this);
    this.pokemonBattle = this.pokemonBattle.bind(this);

    this.pokemonPowerScale = 0;
    this.player1Wins = 0;
    this.player2Wins = 0;
    this.player1Exp = 0;
    this.player2Exp = 0;

    this.ifCritText = "";
    this.p1typeWeakness = null;
    this.p2typeWeakness = null;
    $(".topTrainerIconBox").on("click", this.activateUzair);
    $(".restartButton").on("click", this.nextRound);
  }

  gameSetup(){
    var pokemon1 = this.createPokemon(1);
    var pokemon2 = this.createPokemon(2);
    var pokemon3 = this.createPokemon(3);
    var pokemon4 = this.createPokemon(4);
    var pokemon5 = this.createPokemon(5);
    var pokemon6 = this.createPokemon(6);
    // pokemon1.render();

    this.pokemonPool.push(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6);
    console.log(this.pokemonPool);

  }

  createPokemon(slotNum) {
    let pokeId = this.randomPokemonNumber();

    let pokemon = new Pokemon(slotNum, pokeId, this.addPokemonToArena);
    return pokemon;
  }

  prepBattle(){

    this.backgroundMusic.play();
    console.log("waiting on music")

    let turn = 0;
    if (this.pokemonToFight[0].speed > this.pokemonToFight[1].speed){
      turn = 1;
    } else {
      turn = 2;
    }
    $(".textModalContent").text("The Battle will begin now!");
    let toBattle = this;
    setTimeout(function(){
      toBattle.pokemonBattle(toBattle.pokemonToFight[0], toBattle.pokemonToFight[1], turn);
    }, 1500);

  }

  addPokemonToArena(pokemon){
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
   return Math.floor(Math.random() * 147 + 1);
   }

  pokemonBattle(pokemon1, pokemon2, turn){
    this.ifCritText = "";
    if(turn === 1){
      this.pokemonBattleLogic(pokemon1, pokemon2, turn);
      $("#p1Fighter1").toggle();
      $("#p1Fighter1").toggle();
    } else if (turn === 2){
      this.pokemonBattleLogic(pokemon2, pokemon1, turn);
      $("#p2Fighter1").toggle();
      $("#p2Fighter1").toggle();
    }
    let current = this;
    setTimeout(function () {
      current.checkFaint(pokemon1, pokemon2, turn);
    }, 1500);
  }

  pokemonBattleLogic(attackingPokemon, defendingPokemon, turn){
    let pokemon1Atk = this.checkAttackStat(attackingPokemon); //[atk, type to defend]
    // let pokemon2Atk = this.checkAttackStat(defendingPokemon);
    let pokemon1Damage = this.pokemonDamage(attackingPokemon, defendingPokemon, pokemon1Atk);
    this.attackSound.play();

    $(".textModalContent").text(this.ifCritText + attackingPokemon.name + " attacked " + defendingPokemon.name + " for " + pokemon1Damage + " damage.");
    defendingPokemon.hp -= pokemon1Damage;
    if(turn === 1){
      $(".bottomHPBar").css("width", defendingPokemon.hp + "%");
      $(".bottomHPBar").text(defendingPokemon.hp);
    } else {
      $(".topHPBar").css("width", defendingPokemon.hp + "%");
      $(".topHPBar").text(defendingPokemon.hp);
    }

  }

  checkAttackStat(pokemon){
    if(pokemon.attack >= pokemon.specialAttack){
      return [pokemon.attack, "defense"];
    } else {
      return [pokemon.specialAttack, "specialDefense"];
    }
  }

  pokemonDamage(attackingPokemon, defendingPokemon, attackingInfo){
    let damage = Math.floor(7 * (attackingInfo[0] / defendingPokemon[attackingInfo[1]]));
    let critHit = this.isCrit();
    // let extraTypeDamage = this.isWeak(defendingPokemon);
    if(critHit){
      console.log("crit");
      return Math.floor(damage*1.5);
    } else {
      return damage;
    }
  }

  isCrit(){
    let randomChance = Math.floor(Math.random() * 10 + 1);
    if(randomChance === 6){
      this.ifCritText = "Critical Hit! ";
      return true;
    } else {
      this.ifCritText = "";
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
      $(".textModalContent").text(pokemon1.name + " wins! Nice work, Player 1");
      this.player1Wins++;
      $(".player1Stats").text(this.player1Wins);
    } else {
      $(".textModalContent").text(pokemon2.name + " wins! Good job, Player 2");
      this.player2Wins++;
      $(".player2Stats").text(this.player2Wins);
    }
    this.toggleEndItems();
  }


  nextRound(){
    this.toggleEndItems();
    $(".pokeIcon").removeClass("unselectable");
    $(".pokeIcon").removeClass("selected");
    $(".p1Fighter1").toggleClass("hidden");
    $(".p2Fighter1").toggleClass("hidden");
    this.gameSetup();
  }

  toggleEndItems() {
    $(".winModal").toggleClass("hidden");
    $(".tacoModal").toggleClass("hidden");
    $(".restartButton").toggleClass("hidden");
  }

  activateUzair(){
    console.log("ACTIVATE");
    let uzairoMon = {
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

    this.addPokemonToArena(uzairoMon);
  }

  uzairRender(){
    $(".p1Fighter1")
      .toggleClass("hidden")
      .css("background-image", 'url("assets/uzairShieldBro.jpg")');
    $(".topHPBar").css("width", "60%").text("69");
    $(".topTrainerIconBox").off("click");
  }


}
