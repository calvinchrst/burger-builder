import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4, // Base burger price
  error: false,
};

const reducer = (state = initialState, action) => {
  let updatedIngredients;
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    case actionTypes.ADD_INGREDIENT:
      updatedIngredients = updateObject(state.ingredients, {
        [action.ingredient]: state.ingredients[action.ingredient] + 1,
      });
      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredient],
      });
    case actionTypes.REDUCE_INGREDIENT:
      // Do not remove ingredients if we don't have anything left
      if (state.ingredients[action.ingredient] <= 0) {
        return state;
      }

      updatedIngredients = updateObject(state.ingredients, {
        [action.ingredient]: state.ingredients[action.ingredient] - 1,
      });
      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredient],
      });
    default:
      return state;
  }
};

export default reducer;
