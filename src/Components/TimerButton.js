import React from 'react';
import { PAUSE, PLAY, RESET } from '../const'
const TimerButton = props => {
  const icon =
    props.buttonType === "start_stop" ? (props.counting ? PAUSE : PLAY) : RESET;
  return <i id={props.buttonType} className={icon} onClick={props.onClick} />;
};

export default TimerButton