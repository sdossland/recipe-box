/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';

var AddRecipeBtn = React.createClass({
    getInitialState: function() {
        return ({
            newRecipeTitle: "",
            newIngredients: [],
            showModal: false
        });
    },
    openModal: function () {
        this.setState({showModal: true});
    },
    //correct function to have an alert box register if either or both of the fields have been filled out
    closeModal: function () {
        //if (newRecipeTitle && newIngredients) {
        //confirm('Are you sure you want to exit without saving?') ? this.setState({showModal: false}) : 'null';
        this.setState({showModal: false})
    },
    //this will close the modal if click anywhere outside the actual modal
    closeModalWindow: function (e) {
        if (e.target.id == 'myModal') {
            this.setState({showModal: false});
        }
    },
    titleChange: function(e) {
        this.setState({
            newRecipeTitle: e.target.value
        });
    },
    ingredientsChange: function(e) {
        var values = [];
        values = e.target.value.split(',');
        this.setState({
            newIngredients: values
        });
    },
    handleSubmit: function(e) {
        //this is called to prevent the browser's default action from being run on the form
        e.preventDefault();
        var newRecipe = {
            recipeTitle: this.state.newRecipeTitle,
            ingredients: this.state.newIngredients
        };
        this.props.addRecipe(newRecipe);
        //clears the form once submitted
        this.setState({
            newRecipeTitle: "",
            newIngredients: [],
            showModal: false
        });
        //if (!newRecipeTitle || !newIngredients) {
        //return (alert("Must complete all fields before continuing."));
        //} else {
        //{this.props.ingredients.push(newIngredients)};
        //}
    },
    render: function() {
        return (
            <div>
                {/*Trigger/Open The Modal*/}
                <button className="addRecipeBtn btn btn-lg" id="myBtn" onClick={this.openModal}>Add Recipe</button>
                {/* The Modal*/}
                <form id="myModal" className="modal" style={{display: this.state.showModal ? 'block' : 'none'}}  onSubmit={this.handleSubmit} onClick={this.closeModalWindow}>
                    {/* Modal content */}
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>x</span>
                        <h3>New Recipe</h3>
                        <hr></hr>
                        <h4 className="modalTitles">Recipe</h4>
                        <br />
                        <input type="text" className="newRecipeTitle" placeholder="Recipe title" value={this.state.newRecipeTitle} onChange={this.titleChange} />
                        <br />
                        <h4 className="modalTitles">Ingredients</h4>
                        <br />
                        <textarea type="text" className="newIngredients" placeholder="Ingredients separated by a comma" onChange={this.ingredientsChange} />
                        <br />
                        <div className="row btnRow">
                            <button className="closeBtn" onClick={this.closeModal}>Close</button>
                            <input className="saveBtn" type="submit" value="Save" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});

export default AddRecipeBtn;