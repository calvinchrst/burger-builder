import React from "react";

import classes from "./burgerIngredient.module.css";
import PropTypes from "prop-types";

const INGREDIENT_BREAD_BOTTOM = 0;
const INGREDIENT_BREAD_TOP = 1;
const INGREDIENT_MEAT = 2;
const INGREDIENT_CHEESE = 3;
const INGREDIENT_SALAD = 4;
const INGREDIENT_BACON = 5;

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.types) {
    case INGREDIENT_BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case INGREDIENT_BREAD_TOP:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case INGREDIENT_MEAT:
      ingredient = <div className={classes.Meat}></div>;
      break;
    case INGREDIENT_CHEESE:
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case INGREDIENT_SALAD:
      ingredient = <div className={classes.Salad}></div>;
      break;
    case INGREDIENT_BACON:
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  types: PropTypes.oneOf([
    INGREDIENT_BREAD_BOTTOM,
    INGREDIENT_BREAD_TOP,
    INGREDIENT_MEAT,
    INGREDIENT_CHEESE,
    INGREDIENT_SALAD,
    INGREDIENT_BACON,
  ]).isRequired,
};

export default burgerIngredient;
