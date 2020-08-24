import * as actionTypes from "../action";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4, // Base burger price
};

const reducer = (state = initialState, action) => {
  let updatedIngredients;
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return { ...state, ingredients: action.ingredients };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredient],
      };
    case actionTypes.REDUCE_INGREDIENT:
      // Do not remove ingredients if we don't have anything left
      if (state.ingredients[action.ingredient] <= 0) {
        return state;
      }

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
          totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredient],
        },
      };
    default:
      return state;
  }
};

export default reducer;
