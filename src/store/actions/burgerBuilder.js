import * as actionTypes from "./actionTypes";

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
