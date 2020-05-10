import React from "react";

import * as BI from "../BurgerIngredient/BurgerIngredient";
import util from "../../../util/util";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {
    label: util.stringToSentenceCase(BI.INGREDIENT_SALAD),
    type: BI.INGREDIENT_SALAD,
  },
  {
    label: util.stringToSentenceCase(BI.INGREDIENT_BACON),
    type: BI.INGREDIENT_BACON,
  },
  {
    label: util.stringToSentenceCase(BI.INGREDIENT_CHEESE),
    type: BI.INGREDIENT_CHEESE,
  },
  {
    label: util.stringToSentenceCase(BI.INGREDIENT_MEAT),
    type: BI.INGREDIENT_MEAT,
  },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        clicked={() => props.addIngredient(ctrl.type)}
      />
    ))}
  </div>
);

export default buildControls;
