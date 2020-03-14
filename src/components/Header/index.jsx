import React from 'react';
import Logo from '../Header/Logo';
import { css } from '@emotion/core';

const Header = (props) => {
  const style = css`
    background-color: #20224a;
    width: 100%;
    height: 60px;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  `;

  return (
    <div css={style} {...props}>
      <Logo />
    </div>
  );
};

export default Header;