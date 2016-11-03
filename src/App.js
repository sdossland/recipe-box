import React from 'react';
import './App.css';
import RecipeList from './RecipeList';
import AddRecipeBtn from './AddRecipeBtn';

var originalRecipes = [{
  recipeTitle: "Sausage soup",
  ingredients: ["spicy sausage", "kale", "brocolli", "cauliflower", "tomatoe", "water"]
}, {
  recipeTitle: "Orange berry smoothie",
  ingredients: ["oranges", "strawberries", "blueberries", "ice", "water"]
}, {
  recipeTitle: "Summer salad",
  ingredients: ["tomatoes", "celery", "onions", "salt", "pepper"]
}];

function persistDataToLocalStorage(data) {
  localStorage.setItem('recipes', JSON.stringify(data));
}

var RecipeHolder = React.createClass({
  getInitialState: function() {
    var savedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (!savedRecipes) {
      localStorage.setItem('recipes', JSON.stringify(originalRecipes));
    }
    return {
      data: savedRecipes || originalRecipes
    }
  },
  addRecipe: function(recipe) {
    //makes a copy of the data array (you don't want to modify original)
    var data = this.state.data.slice();
    //pushes the new recipe in
    data.push(recipe);
    //the modified dataset replaces the old data
    this.setState({data: data}, function() {
      persistDataToLocalStorage(data);
    });
  },
  deleteRecipe: function(key) {
    var data = this.state.data.slice();
    data.splice(key, 1);
    this.setState({data: data}, function () {
      persistDataToLocalStorage(data);
    });
  },
  editRecipe: function(newRecipe, key) {
    var data = this.state.data.slice();
    data[key] = newRecipe;
    /*
     var title = newRecipe.recipeTitle;
     for (var i = 0; i<data.length; i++) {
     if (data[i].recipeTitle === title) {
     var key = i;
     data.splice(key, 1, newRecipe);
     }
     } */
    this.setState({data: data}, function () {
      persistDataToLocalStorage(data);
    });
  },
  render: function() {
    return (
        <div className="recipeHolder">
          <h1>Recipe Box</h1>
          <RecipeList data={this.state.data} deleteRecipe={this.deleteRecipe} editRecipe={this.editRecipe} />
          <AddRecipeBtn data={this.state.data} addRecipe={this.addRecipe} />
        </div>
    );
  }
});

export default RecipeHolder;