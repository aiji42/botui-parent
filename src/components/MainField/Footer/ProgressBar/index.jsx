import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import { conversationIds } from '../../../../util/conversations';

const percentage = ({ id }) => conversationIds().indexOf(id) / conversationIds().length * 100;

const ProgressBar = ({ handshakeChild }) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    handshakeChild && handshakeChild.on('updateStatus', (data) => {
      setPercent(percentage(data));
    });
  }, [handshakeChild]);

  return (
    <Line percent={percent}
      strokeWidth="3" strokeColor="#0f84fe"
      trailWidth="3"
    />
  );
};

ProgressBar.propTypes = {
  handshakeChild: PropTypes.object
};

export default ProgressBar;