import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const open = css`
  width: 25px;
  height: 18px;
  background-color: #62cfc1;
  border-radius: 4px;
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    right: 4px;
    bottom: -6px;
    border-left: 6px solid transparent;
    border-right: 2px solid transparent;
    border-top: 6px solid #62CFC1;
  }
`;

const Open = ({ onClick }) => {
  return <div onClick={onClick} css={open}></div>;
};

Open.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Open;