import React from "react";

import * as BI from "../BurgerIngredient/BurgerIngredient";
import { stringToSentenceCase } from "../../../shared/utility";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {
    label: stringToSentenceCase(BI.INGREDIENT_SALAD),
    type: BI.INGREDIENT_SALAD,
  },
  {
    label: stringToSentenceCase(BI.INGREDIENT_BACON),
    type: BI.INGREDIENT_BACON,
  },
  {
    label: stringToSentenceCase(BI.INGREDIENT_CHEESE),
    type: BI.INGREDIENT_CHEESE,
  },
  {
    label: stringToSentenceCase(BI.INGREDIENT_MEAT),
    type: BI.INGREDIENT_MEAT,
  },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addIngredient={() => props.addIngredient(ctrl.type)}
        removeIngredient={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchasing}
    >
      {props.isAuthenticated ? "ORDER NOW" : "SIGN IN/UP TO ORDER"}
    </button>
  </div>
);

export default buildControls;
