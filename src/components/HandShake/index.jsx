import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import handshake from '../../handshake';
import { css } from '@emotion/core';

const style = css`
  width: 100%;
  height: 100%;
`;

const HandShake = ({ onPrepared, updateFooter }) => {
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
    <div css={style} ref={el}></div>
  );
};

HandShake.propTypes = {
  onPrepared: PropTypes.func.isRequired,
  updateFooter: PropTypes.func
};

export default HandShake;