import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1, // TODO: Somehow change this to use Constant declared in BurgerIngredient.js
      bacon: 1,
      cheese: 2,
      meat: 2,
    },
  };

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <p>Ingredients</p>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
