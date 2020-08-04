import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import Formula from "./Formula";
import Output from "./Output";

const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /[x/+]‑$/;

const Calculator = () => {
  const [caculator, setCaculator] = useState({
    currentVal: "0",
    prevVal: "0",
    formula: "",
    currentSign: "pos",
    lastClicked: ""
  });

  const maxDigitWarning = () => {
    setCaculator({
      ...caculator,
      currentVal: "Digit Limit Met",
      prevVal: caculator.currentVal,
    });
    setTimeout(
      () => setCaculator({ ...caculator, currentVal: caculator.prevVal }),
      1000
    );
  };

  const handleEvaluate = () => {
    if (!caculator.currentVal.includes("Limit")) {
      let expression = caculator.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      setCaculator({
        ...caculator,
        currentVal: answer.toString(),
        formula:
          expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,
        prevVal: answer,
        evaluated: true
      });
    }
  };

  const handleOperators = (e) => {
    if (!caculator.currentVal.includes("Limit")) {
      const value = e.target.value;
      const { formula, prevVal, evaluated } = caculator;
      console.log({ caculator });
      console.log('caculator', caculator && caculator)
      setCaculator({ ...caculator, currentVal: value, evaluated: false });
      if (evaluated) {
        setCaculator({ ...caculator, formula: prevVal + value });
      } else if (!endsWithOperator.test(formula)) {
        setCaculator({
          ...caculator,
          prevVal: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        setCaculator({
          ...caculator,
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
            value
        });
      } else if (value !== "‑") {
        setCaculator({
          ...caculator,
          formula: prevVal + value
        });
      }
    }
  };

  const handleNumbers = (e) => {
    if (!caculator.currentVal.includes("Limit")) {
      const { currentVal, formula, evaluated } = caculator;
      const value = e.target.value;
      setCaculator({ ...caculator, evaluated: false });
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (evaluated) {
        setCaculator({
          ...caculator,
          currentVal: value,
          formula: value !== "0" ? value : ""
        });
      } else {
        setCaculator({
          ...caculator,
          currentVal:
            currentVal === "0" || isOperator.test(currentVal)
              ? value
              : currentVal + value,
          formula:
            currentVal === "0" && value === "0"
              ? formula === "" ? value : formula
              : /([^.0-9]0|^0)$/.test(formula)
                ? formula.slice(0, -1) + value
                : formula + value
        });
      }
    }
  };

  const handleDecimal = () => {
    if (caculator.evaluated === true) {
      setCaculator({
        ...caculator,
        currentVal: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (
      !caculator.currentVal.includes(".") &&
      !caculator.currentVal.includes("Limit")
    ) {
      setCaculator({ ...caculator, evaluated: false });
      if (caculator.currentVal.length > 21) {
        maxDigitWarning();
      } else if (
        endsWithOperator.test(caculator.formula) ||
        (caculator.currentVal === "0" && caculator.formula === "")
      ) {
        setCaculator({
          ...caculator,
          currentVal: "0.",
          formula: caculator.formula + "0."
        });
      } else {
        setCaculator({
          ...caculator,
          currentVal: caculator.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: caculator.formula + "."
        });
      }
    }
  };

  const initialize = () => {
    setCaculator({
      ...caculator,
      currentVal: "0",
      prevVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false,
    });
  };

  return (
    <div>
      <div className="calculator">
        <Formula formula={caculator.formula.replace(/x/g, "⋅")} />
        <Output currentValue={caculator.currentVal} />
        <Buttons
          decimal={handleDecimal}
          evaluate={handleEvaluate}
          initialize={initialize}
          numbers={handleNumbers}
          operators={handleOperators}
        />
      </div>
      <div className="author">
        {" "}
        Designed and Coded By <br />
        <a href="https://goo.gl/6NNLMG" target="_blank">
          Tomnyson
        </a>
      </div>
    </div>
  );
};

export default Calculator;
