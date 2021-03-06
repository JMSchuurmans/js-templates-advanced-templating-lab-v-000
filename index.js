function init() {
  handlebarsSetup()
  initForm()
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})

function initForm() {
  let formTemplate = document.getElementById("recipe-form-template").innerHTML
  let template = Handlebars.compile(formTemplate)
  document.getElementsByTagName("main")[0].innerHTML = template({'submitAction': 'createRecipe()'})
}

function createRecipe() {
  let recipe = getRecipeVals()
  let recipeTemplate = document.getElementById("recipe-template").innerHTML
  let template = Handlebars.compile(recipeTemplate)
  document.getElementById("main").innerHTML = template(recipe)
}

function updateRecipe() {
  var recipe = getRecipeVals()
  var recipeTemplate = document.getElementById("recipe-template").innerHTML
  var template = Handlebars.compile(recipeTemplate)
  document.getElementById("main").innerHTML = template(recipe)
}

function displayEditForm() {
  let name = document.getElementById("name").innerText
  let description = document.getElementById("description").innerText
  let ingredietsNodes = document.getElementsByName("ingredientsList")
  let ingredients = []
  for(var i = 0; i < ingredientsNodes.length; i++) {
    ingredients.push(ingredientsNodes[i].innerText)
  }

  let recipe = {name, description, ingredients, submitAction: 'createRecipe()'}

  let recipeFormTemplate = document.getElementById("recipeFormTemplate").innerHTML
  let template = Handlebars.compile(recipeFormTemplate)
  document.getElementById("main").innerHTML = template(recipe)
}

function getRecipeVals() {
  let ingredientsNodes = document.getElementsByName("ingredients")
  let ingredients = []
  for(let i = 0; i < ingredientsNodes.length; i++) {
    if(ingredientsNodes[i].value !== "") {
      ingredients.push(ingredientsNodes[i].value)
    }
  }
  let name = document.getElementById("name").value
  let description = document.getElementById("description").value
  let recipe = {name, ingredients, description}
  return(recipe)
}

function handlebarsSetup() {
  Handlebars.registerHelper('displayIngredient', function(ingredient) {
    return new Handlebars.SafeString('<li name="ingredients">' + ingredient + '</li>')
  })
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById("recipe-details-partial").innerHTML)
  Handlebars.registerPartial('recipeFormPartial', document.getElementById("recipe-form-partial").innerHTML)
}
