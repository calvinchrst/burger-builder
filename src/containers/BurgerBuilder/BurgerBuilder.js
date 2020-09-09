import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  // subscription required // not sure how
  const isPurchasable = (ingredients) => {
    const nrIngredients = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return nrIngredients > 0;
  };

  const purchasingHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.setAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchasingCancelHandler = () => {
    setPurchasing(false);
  };

  const purchasingContinueHandler = () => {
    props.onPurchaseBurgerInit();
    props.history.push("/checkout");
  };

  let burger = <Spinner />;
  let orderSummary = null;

  if (props.ingredients) {
    // updatePurchasableState(props.ingredients);
    // Disable less button if we don't have ingredients of some type
    // DisabledInfo is an object that contains
    //    key: ingredient name and
    //    value: boolean true / false if the ingredient less button should be disabled
    const disabledInfo = { ...props.ingredients };
    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
    }

    burger = (
      <Auxiliary>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          addIngredient={props.onAddIngredient}
          removeIngredient={props.onReduceIngredient}
          disabledInfo={disabledInfo}
          purchasable={isPurchasable(props.ingredients)}
          price={props.totalPrice}
          purchasing={purchasingHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </Auxiliary>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        purchaseCancelled={purchasingCancelHandler}
        purchaseContinued={purchasingContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  if (props.error) {
    burger = <p>Can't fetch ingredients from server</p>;
  }

  return (
    <Auxiliary>
      <Modal show={purchasing} modalClosed={purchasingCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitIngredients: () => dispatch(actions.initIngredient()),
    onAddIngredient: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onReduceIngredient: (ingredient) =>
      dispatch(actions.reduceIngredient(ingredient)),
    onPurchaseBurgerInit: () => dispatch(actions.purchaseBurgerInit()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
