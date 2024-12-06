import React, { Component } from 'react';
import '../css/RecipeList.css';
import PreviewItem from './PreviewItem';
import RecipeData from '../../models/recipes.json';

//Could also use a funcional component to avoid using class component, but for proof of concept
class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: RecipeData,
        };
    }

    render() {
        const { recipes } = this.state;
        // Map through the recipes array and render PreviewItem
        return (
            <main>
                <section className="all-recipes">
                    <h2 className="all-recipes-heading">All Recipes</h2>
                    <div className="all-recipes-grid">
                        {recipes.map((previewItem) => (
                            <PreviewItem
                                key={previewItem.id}
                                id={previewItem.id}
                                image={previewItem.image}
                                name={previewItem.name}
                                servings={previewItem.servings}
                                price={previewItem.price}
                            />
                        ))}
                    </div>
                </section>
            </main>
        );
    };
}

export default RecipeList;
