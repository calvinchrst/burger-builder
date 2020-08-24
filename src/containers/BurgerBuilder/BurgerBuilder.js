import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount = () => {
    axios
      .get("/ingredients.json")
      .then((result) => {
        this.props.onSetIngredients(result.data);
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  // subscription required // not sure how
  updatePurchasableState = (ingredients) => {
    const nrIngredients = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: nrIngredients > 0 });
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasingContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price=" + encodeURIComponent(this.props.totalPrice));
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    let burger = <Spinner />;
    let orderSummary = null;

    if (this.props.ingredients) {
      // this.updatePurchasableState(this.props.ingredients);
      // Disable less button if we don't have ingredients of some type
      // DisabledInfo is an object that contains
      //    key: ingredient name and
      //    value: boolean true / false if the ingredient less button should be disabled
      const disabledInfo = { ...this.props.ingredients };
      for (let ingredient in disabledInfo) {
        disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
      }

      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onReduceIngredient}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.props.totalPrice}
            purchasing={this.purchasingHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchasingCancelHandler}
          purchaseContinued={this.purchasingContinueHandler}
          price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetIngredients: (ingredients) =>
      dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: ingredients }),
    onAddIngredient: (ingredient) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient: ingredient }),
    onReduceIngredient: (ingredient) =>
      dispatch({ type: actionTypes.REDUCE_INGREDIENT, ingredient: ingredient }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
