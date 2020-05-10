import React from "react";

import classes from "./Burger.module.css";
import * as BI from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BI.burgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((prevValue, curValue) => {
      return prevValue.concat(curValue);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BI.burgerIngredient type={BI.INGREDIENT_BREAD_TOP} />
      {transformedIngredients}
      <BI.burgerIngredient type={BI.INGREDIENT_BREAD_BOTTOM} />
    </div>
  );
};

export default Burger;
