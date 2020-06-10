import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const close = css`
  width: 25px;
  height: 25px;
  height: 33px;
  width: 2px;
  background-color: #333;
`;

const before = css`
  position: absolute;
  transform: rotate(45deg);
`;

const after = css`
  transform: rotate(-45deg);
`;

const Close = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <div css={[close, before]} />
      <div css={[close, after]} />
    </div>
  );
};

Close.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Close;