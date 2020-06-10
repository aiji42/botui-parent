import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { css } from '@emotion/core';
import { countableIds } from '../../../util/conversations';

const base = css`
  padding: 5px 10px 0px 10px
`;

const span = css`
  font-family: 'Noto Sans JP', sans-serif;
  text-align: center;
  color: gray;
`;

const remainingNumber = ({ id }) => countableIds().reverse().indexOf(id) + 1;

const Footer = ({ handshakeChild, css: cssStyle, ...props }) => {
  const [remaining, setRemaining] = useState(null);
  useEffect(() => {
    let unmounted = false;
    handshakeChild && handshakeChild.on('updateStatus', (data) => {
      !unmounted && setRemaining(remainingNumber(data));
    });
    return () => { unmounted = true; };
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