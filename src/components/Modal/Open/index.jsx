import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const open = css`
  width: 40px;
  height: 28px;
  background-color: #62cfc1;
  border-radius: 4px;
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    right: 10px;
    bottom: -10px;
    border-left: 10px solid transparent;
    border-right: 2px solid transparent;
    border-top: 10px solid #62CFC1;
  }
`;

const Open = ({ onClick }) => {
  return <div onClick={onClick} css={open}></div>;
};

Open.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Open;
