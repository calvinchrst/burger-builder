import React from "react";

import classes from "./Burger.module.css";
import * as BI from "./BurgerIngredient/BurgerIngredient";

const Burger = () => {
  return (
    <div className={classes.Burger}>
      <BI.burgerIngredient type={BI.INGREDIENT_BREAD_TOP} />
      <BI.burgerIngredient type={BI.INGREDIENT_CHEESE} />
      <BI.burgerIngredient type={BI.INGREDIENT_MEAT} />
      <BI.burgerIngredient type={BI.INGREDIENT_BREAD_BOTTOM} />
    </div>
  );
};

export default Burger;
