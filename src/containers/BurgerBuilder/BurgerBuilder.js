import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // subscription required // not sure how
  isPurchasable = (ingredients) => {
    const nrIngredients = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return nrIngredients > 0;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasingContinueHandler = () => {
    this.props.history.push("/checkout");
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
            purchasable={this.isPurchasable(this.props.ingredients)}
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

    if (this.props.error) {
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
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
    onAddIngredient: (ingredient) =>
      dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onReduceIngredient: (ingredient) =>
      dispatch(burgerBuilderActions.reduceIngredient(ingredient)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
