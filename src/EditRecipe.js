/**
 * Created by sophia on 11/1/16.
 */
import React from 'react';

var EditRecipe = React.createClass({
    getInitialState: function() {
        return ({
            newRecipeTitle: this.props.recipeTitle,
            newIngredients: this.props.ingredients.join(', '),
            showModal: false
        });
    },
    openModal: function () {
        this.setState({
            showModal: true
        });
    },
    closeModal: function (e) {
        e.preventDefault();
        this.setState({showModal: false})
    },
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
        //console.log(values);
        this.setState({
            newIngredients: e.target.value
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var values = [];
        values = this.state.newIngredients.split(',');
        var newRecipe = {
            recipeTitle: this.state.newRecipeTitle,
            ingredients: values
        };
        this.props.editRecipe(newRecipe); //work on this
        this.setState({showModal: false});
    },
    render: function() {
        return (
            <div>
                {/*Trigger/Open The Modal*/}
                <button className="saveBtn" onClick={this.openModal}>Edit</button>
                {/* The Modal*/}
                <form id="myModal" className="modal" style={{display: this.state.showModal ? 'block' : 'none'}}  onSubmit={this.handleSubmit} onClick={this.closeModalWindow}>
                    {/* Modal content */}
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>x</span>
                        <h3 className="blackText"> {this.props.modalTitle}</h3>
                        <hr></hr>
                        <h4 className="modalTitles">Recipe</h4>
                        <br />
                        <input type="text" className="newRecipeTitle" value={this.state.newRecipeTitle} onChange={this.titleChange} />
                        <br />
                        <h4 className="modalTitles">Ingredients</h4>
                        <br />
                        <textarea type="text" className="newIngredients" value={this.state.newIngredients} onChange={this.ingredientsChange} />
                        <br />
                        <div className="row btnRow">
                            <button className="closeBtn" onClick={this.closeModal}>Close</button>
                            <input className="saveBtn" type="submit" value="Save" />
                        </div>
                    </div>
                </form>
            </div>
        )}
});

export default EditRecipe;