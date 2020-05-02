import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const style = css`
  width: 100%;
`;

const chatStart = async (handshakeChild, onReady) => {
  if (!handshakeChild) return;
  const isReady = await handshakeChild.get('isReady');
  if (isReady) {
    handshakeChild.call('startChat');
    onReady();
  } else {
    handshakeChild.on('readyToStartChat', () => {
      handshakeChild.call('startChat');
      onReady();
    });
  }
};

const Body = ({ handshakeChild, handshakeElement, onReady, css: cssStyle, ...props }) => {
  useEffect(() => { chatStart(handshakeChild, onReady); }, [handshakeChild]);

  return (
    <div css={[style, cssStyle]} ref={handshakeElement} {...props}></div>
  );
};

Body.propTypes = {
  handshakeChild: PropTypes.object,
  handshakeElement: PropTypes.object.isRequired,
  onReady: PropTypes.func.isRequired,
  css: PropTypes.object,
};

export default Body;