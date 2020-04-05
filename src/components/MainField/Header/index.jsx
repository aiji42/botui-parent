import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import { css } from '@emotion/core';

const style = css`
  background-color: #ffffff;
  width: 100%;
  text-align: center;
  border-bottom: solid 1px gray;
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