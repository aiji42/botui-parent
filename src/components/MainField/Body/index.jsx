import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const style = css`
  width: 100%;
`;

const Body = ({ handshakeChild, handshakeElement, onReady, css: cssStyle, ...props }) => {
  useEffect(() => {
    handshakeChild && handshakeChild.on('readyToStartChat', () => {
      handshakeChild.call('startChat');
      onReady();
    });
  }, [handshakeChild]);

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