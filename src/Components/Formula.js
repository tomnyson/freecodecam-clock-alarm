import React from 'react'
import PropTypes from 'prop-types';

export const Formula = ({ formula }) => {
  return <div className="formulaScreen">{formula}</div>;
}

Formula.propTypes = {
  formula: PropTypes.string,
}
export default Formula