import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const dispatch = useDispatch();
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredient()),
    [dispatch]
  );
  const onAddIngredient = (ingredient) =>
    dispatch(actions.addIngredient(ingredient));
  const onReduceIngredient = (ingredient) =>
    dispatch(actions.reduceIngredient(ingredient));
  const onPurchaseBurgerInit = () => dispatch(actions.purchaseBurgerInit());
  const setAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token != null);

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
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      setAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchasingCancelHandler = () => {
    setPurchasing(false);
  };

  const purchasingContinueHandler = () => {
    onPurchaseBurgerInit();
    props.history.push("/checkout");
  };

  let burger = <Spinner />;
  let orderSummary = null;

  if (ingredients) {
    // updatePurchasableState(ingredients);
    // Disable less button if we don't have ingredients of some type
    // DisabledInfo is an object that contains
    //    key: ingredient name and
    //    value: boolean true / false if the ingredient less button should be disabled
    const disabledInfo = { ...ingredients };
    for (let ingredient in disabledInfo) {
      disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
    }

    burger = (
      <Auxiliary>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={onAddIngredient}
          removeIngredient={onReduceIngredient}
          disabledInfo={disabledInfo}
          purchasable={isPurchasable(ingredients)}
          price={totalPrice}
          purchasing={purchasingHandler}
          isAuthenticated={isAuthenticated}
        />
      </Auxiliary>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={purchasingCancelHandler}
        purchaseContinued={purchasingContinueHandler}
        price={totalPrice}
      />
    );
  }

  if (error) {
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

export default WithErrorHandler(BurgerBuilder, axios);
