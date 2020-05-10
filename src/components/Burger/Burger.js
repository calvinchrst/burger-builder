import React from "react";

import classes from "./Burger.module.css";
import * as BI from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BI.burgerIngredient key={igKey + i} type={igKey} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BI.burgerIngredient type={BI.INGREDIENT_BREAD_TOP} />
      {transformedIngredients}
      <BI.burgerIngredient type={BI.INGREDIENT_BREAD_BOTTOM} />
    </div>
  );
};

export default Burger;
