import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0, // TODO: Somehow change this to use Constant declared in BurgerIngredient.js
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;

    const updateTotalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updateTotalPrice,
    });
  };

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls addIngredient={this.addIngredientHandler} />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
