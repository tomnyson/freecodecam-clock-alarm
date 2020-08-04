import React from 'react';
import { INCREMENT, DECREMENT } from '../const'
const SetButton = props => {
  const icon =
    props.buttonId.split("-")[1] === "increment" ? INCREMENT : DECREMENT;
  return <i id={props.buttonId} className={icon} onClick={props.onClick} />;
};

export default SetButton;