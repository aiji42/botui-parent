import React from 'react';
import Logo from './Logo';
import { css } from '@emotion/core';

const style = css`
    background-color: #20224a;
    width: 100%;
    text-align: center;
  `;

const Header = ({ css, ...props }) => (
  <div css={[style, css]} {...props}>
    <Logo />
  </div>
);

export default Header;