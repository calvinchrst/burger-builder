import React from "react";

import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const INGREDIENT_BREAD_BOTTOM = "bread-bottom";
const INGREDIENT_BREAD_TOP = "bread-top";
const INGREDIENT_MEAT = "meat";
const INGREDIENT_CHEESE = "cheese";
const INGREDIENT_SALAD = "salad";
const INGREDIENT_BACON = "bacon";

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
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
  type: PropTypes.oneOf([
    INGREDIENT_BREAD_BOTTOM,
    INGREDIENT_BREAD_TOP,
    INGREDIENT_MEAT,
    INGREDIENT_CHEESE,
    INGREDIENT_SALAD,
    INGREDIENT_BACON,
  ]).isRequired,
};

export {
  burgerIngredient,
  INGREDIENT_BREAD_BOTTOM,
  INGREDIENT_BREAD_TOP,
  INGREDIENT_MEAT,
  INGREDIENT_CHEESE,
  INGREDIENT_SALAD,
  INGREDIENT_BACON,
};
