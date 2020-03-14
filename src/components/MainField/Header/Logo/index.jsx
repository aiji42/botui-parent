import React from 'react';
import { css } from '@emotion/core';
import logo from './logo.png';

const style = css`
  box-sizing: content-box;
  max-height: 25px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px 0;
`;

const Logo = (props) => <img css={style} src={logo} {...props} />;
export default Logo;