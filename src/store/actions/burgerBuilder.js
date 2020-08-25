import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient,
  };
};

export const reduceIngredient = (ingredient) => {
  return {
    type: actionTypes.REDUCE_INGREDIENT,
    ingredient: ingredient,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
