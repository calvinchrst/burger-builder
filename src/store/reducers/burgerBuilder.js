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
  isBuilding: false,
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    isBuilding: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const addIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredient]: state.ingredients[action.ingredient] + 1,
  });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredient],
    isBuilding: true,
  });
};

const reduceIngredients = (state, action) => {
  // Do not remove ingredients if we don't have anything left
  if (state.ingredients[action.ingredient] <= 0) {
    return state;
  }

  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredient]: state.ingredients[action.ingredient] - 1,
  });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredient],
    isBuilding: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    case actionTypes.ADD_INGREDIENT:
      return addIngredients(state, action);
    case actionTypes.REDUCE_INGREDIENT:
      return reduceIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
