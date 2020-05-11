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
    <button className={classes.OrderButton} disabled={!props.purchasable}>
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
