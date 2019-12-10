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
    console.log("response is: ", response);
    this.recipe = response.recipe;
      $(".tacoRecipe").text(this.recipe);
    this.baseLayerRecipe = response.base_layer.recipe;
      $(".tacoBaseRecipe").text(this.baseLayerRecipe);
    if(response.condiment){
      if(response.condiment.recipe){
        this.condimentRecipe = response.condiment.recipe;
        var condimentDiv = $("<div>").addClass("condimentRecipe").text(this.condimentRecipe);
        $(".tacoModal").append(condimentDiv);
      }
    }
    if(response.mixin){
      if(response.mixin.recipe){
        this.mixinRecipe = response.mixin.recipe;
        var mixinDiv = $("<div>").addClass("mixinRecipe").text(this.mixinRecipe);
        $(".tacoModal").append(mixinDiv);
      }
    }


  }

  proccessTacoError(error){
    console.log("error is: ", error);
  }


}
