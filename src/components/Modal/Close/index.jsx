import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const close = css`
  width: 25px;
  height: 25px;
  :before, :after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

const Close = ({ onClick }) => {
  return <div onClick={onClick} css={close} />;
};

Close.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Close;
