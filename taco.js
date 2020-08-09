class Taco{
  constructor(){
    this.recipe = null;
    this.baseLayerRecipe = null;
    this.condimentRecipe = null;
    this.mixinRecipe = null;
    this.getTacoFromServer = this.getTacoFromServer.bind(this);
  }

  getTacoFromServer(){
    $.ajax({
      dataType: "json",
      url: "http://taco-randomizer.herokuapp.com/random/?full-taco=true",
      method: "GET",
      success: this.proccessTacoSuccess,
      error: this.proccessTacoError,
    })
  }

  proccessTacoSuccess(response){
    console.log("tacoresponse:",response);
    var recipe = marked(response.recipe);
    var tacoText = $('<div>').html(recipe);
    var tacoTitle = $("<h1>").text("Taco Rare Candy")
    var tacoPicture = $("<img>").attr("src", "assets/taco.png").attr("alt", "broken");
      $(".tacoRecipe").append(tacoTitle,tacoPicture, tacoText);
      }





  proccessTacoError(error){
    console.log("error is: ", error);
  }


}
