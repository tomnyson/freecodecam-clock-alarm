
import React from 'react'
import SetButton from './SetButton'
const Setter = props => {
  const labelId = `${props.setType}-label`;
  const label = `${props.setType[0].toUpperCase() +
    props.setType.slice(1)} Length`;
  const lengthId = `${props.setType}-length`;
  const length = props.length;
  const incrementId = `${props.setType}-increment`;
  const decrementId = `${props.setType}-decrement`;
  return (
    <div className="setter">
      <h2 id={labelId}>{label}</h2>
      <SetButton buttonId={decrementId} onClick={props.onClick} />
      <span id={lengthId}>{length}</span>
      <SetButton buttonId={incrementId} onClick={props.onClick} />
    </div>
  );
};
export default Setter