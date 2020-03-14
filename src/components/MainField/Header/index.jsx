import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import { css } from '@emotion/core';

const style = css`
    background-color: #20224a;
    width: 100%;
    text-align: center;
  `;

const Header = ({ css: cssStyle, ...props }) => (
  <div css={[style, cssStyle]} {...props}>
    <Logo />
  </div>
);

Header.propTypes = {
  css: PropTypes.object
};

export default Header;