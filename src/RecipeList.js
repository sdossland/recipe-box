/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';
import EditRecipe from './EditRecipe';

var RecipeList = React.createClass({
    getInitialState: function() {
        return {
            recipeKey: {}
        };
    },
    //establish recipeKey as key to capture which recipe was clicked
    onClickHandler(key) {
        this.setState(
            function(prevState) {
                var recipeKey = prevState.recipeKey;
                recipeKey[key] = !(prevState.recipeKey[key]);
                return recipeKey;
            }
        );
    },
    componentWillMount() {
        this.onClickHandler = this.onClickHandler.bind(this);
    },
    handleDelete: function(key) {
        this.props.deleteRecipe(key);
    },
    render: function() {
        var onClickHandler = this.onClickHandler;
        var onDeleteHandler = this.handleDelete;
        var editRecipe = this.props.editRecipe;
        var recipeKey = this.state.recipeKey;
        //var showIngredients = this.state.showIngredients;

        var recipeTitles = this.props.data.map(function(recipe, key) {
            function onClick() {
                onClickHandler(key);
            }
            function handleDelete() {
                onDeleteHandler(key);
            }
            function handleEdit() {
                return function(newRecipe) {
                    editRecipe(newRecipe, key);
                }
            }
            return (
                <div id="recipes" >
                    <p className="recipeTitles" key={key} onClick={onClick}>
                        {recipe.recipeTitle}
                    </p>
                    <ul className="ingredientsList">
                        {
                            recipeKey[key] &&
                            <div>
                                <h4>Ingredients</h4>
                                <hr></hr>
                                {
                                    recipe.ingredients.map(function(ingredient, key) {
                                        return (
                                            <div key={key}>
                                                {ingredient}
                                            </div>
                                        )
                                    })
                                }
                                <hr></hr>
                                <div className="editDeleteRow">
                                    <button className="closeBtn" key={key} onClick={handleDelete} >Delete</button>
                                    <EditRecipe modalTitle="Edit Recipe" recipeTitle={recipe.recipeTitle} ingredients={recipe.ingredients} editRecipe={handleEdit()} ></EditRecipe>
                                </div>
                            </div>
                        }
                    </ul>
                </div>
            );
        });

        return (
            <div className="recipeList">
                {recipeTitles}
            </div>
        );
    }
});

export default RecipeList;