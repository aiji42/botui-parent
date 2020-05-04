import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { css } from '@emotion/core';
import { conversationIds } from '../../../util/conversations';

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

const remainingNumber = ({ id }) => conversationIds().reverse().indexOf(id);

const Footer = ({ handshakeChild, css: cssStyle, ...props }) => {
  const [remaining, setRemaining] = useState(null);
  useEffect(() => {
    handshakeChild && handshakeChild.on('updateStatus', (data) => {
      setRemaining(remainingNumber(data));
    });
  }, [handshakeChild]);

  return (
    <div css={[cssStyle, base]} {...props}>
      <ProgressBar handshakeChild={handshakeChild} />
      <div css={span}>{!!remaining && `のこり${remaining}問で完了`}</div>
    </div>
  );
};

Footer.propTypes = {
  handshakeChild: PropTypes.object,
  css: PropTypes.object
};

export default Footer;