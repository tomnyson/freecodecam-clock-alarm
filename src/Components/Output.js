import React from "react";
import PropTypes from 'prop-types';

const Output = ({ currentValue }) => {
  return (
    <div className="outputScreen" id="display">
      {currentValue}
    </div>
  );
};
export default Output;

Output.propTypes = {
  currentValue: PropTypes.string,
}