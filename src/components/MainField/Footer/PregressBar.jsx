import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

const ProgressBar = ({ percent }) => (
  <Line percent={percent}
    strokeWidth="3" strokeColor="#0f84fe"
    trailWidth="3"
  />
);

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired
};

export default ProgressBar;