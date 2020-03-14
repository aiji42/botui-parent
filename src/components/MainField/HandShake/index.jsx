import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import handshake from '../../../handshake';
import { css } from '@emotion/core';

const style = css`
  width: 100%;
`;

const HandShake = ({ onPrepared, updateFooter, css, ...props }) => {
  const el = useRef(null);

  useEffect(() => {
    handshake(el.current).then(child => {
      child.frame.setAttribute('height', '100%');
      child.frame.setAttribute('width', '100%');
      child.frame.setAttribute('frameborder', 'no');
      child.on('updateFooter', updateFooter);
      child.on('readyToStartChat', () => {
        child.call('startChat');
        onPrepared();
      });
    });
  }, []);

  return (
    <div css={[style, css]} ref={el} {...props}></div>
  );
};

HandShake.propTypes = {
  onPrepared: PropTypes.func.isRequired,
  updateFooter: PropTypes.func
};

export default HandShake;