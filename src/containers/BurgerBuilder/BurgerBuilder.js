import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount = () => {
    axios
      .get("/ingredients.json")
      .then((result) => {
        console.log(result.data);
        this.setState({ ingredients: result.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  updatePurchasableState = (ingredients) => {
    const nrIngredients = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: nrIngredients > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;

    const updateTotalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updateTotalPrice,
    });
    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    // Do not remove ingredients if we don't have anything left
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] - 1;

    const updateTotalPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updateTotalPrice,
    });
    this.updatePurchasableState(updatedIngredients);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasingContinueHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice, // You should recalculate the price on the server for production
    //   customer: {
    //     name: "Calvin Christian",
    //     address: {
    //       street: "Jalan Teratai",
    //       zipCode: "28281",
    //       country: "Malaysia",
    //     },
    //     email: "test@test.com",
    //   },
    //   deliveryMethod: "fastest",
    // };

    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ purchasing: false, loading: false });
    //   })
    //   .catch((err) => {
    //     this.setState({ purchasing: false, loading: false });
    //   });
    this.props.history.push("/checkout");
  };

  render() {
    let burger = <Spinner />;
    let orderSummary = null;

    if (this.state.ingredients) {
      // Disable less button if we don't have ingredients of some type
      // DisabledInfo is an object that contains
      //    key: ingredient name and
      //    value: boolean true / false if the ingredient less button should be disabled
      const disabledInfo = { ...this.state.ingredients };
      for (let ingredient in disabledInfo) {
        disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
      }

      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            purchasing={this.purchasingHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchasingCancelHandler}
          purchaseContinued={this.purchasingContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    if (this.state.error) {
      burger = <p>Can't fetch ingredients from server</p>;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
