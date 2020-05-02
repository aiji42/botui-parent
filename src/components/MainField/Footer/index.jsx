import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './PregressBar';
import { css } from '@emotion/core';

const base = css`
  padding: 0 10px
`;

const span = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.9em;
  line-height: 0.9em;
  text-align: center;
  color: gray;
`;

const Footer = ({ handshakeChild, css: cssStyle, ...props }) => {
  const [percent, setPercent] = useState(0);
  const [remaining, setRemaining] = useState(null);
  useEffect(() => {
    handshakeChild && handshakeChild.on('updateFooter', ([percentage, remainingNumber]) => {
      setPercent(percentage);
      setRemaining(remainingNumber);
    });
  }, [handshakeChild]);

  return (
    <div css={[cssStyle, base]} {...props}>
      <ProgressBar percent={percent} />
      <div css={span}>{!!remaining && `のこり${remaining}問で完了`}</div>
    </div>
  );
};

Footer.propTypes = {
  handshakeChild: PropTypes.object,
  css: PropTypes.object
};

export default Footer;