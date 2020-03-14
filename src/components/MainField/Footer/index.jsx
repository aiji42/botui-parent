import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './PregressBar'
import { css } from '@emotion/core';

const base = css`
  padding: 0 5px
`;

const span = css`
  position: fixed;
  bottom: 20px;
  right: 0px;
  color: gray;
`

const Footer = ({ percent, remaining, css, ...props }) => {
  return (
    <div css={[css, base]} {...props}>
      <span css={span}>{!!remaining && `のこり${remaining}問で完了！`}</span>
      <ProgressBar percent={percent} />
    </div>
  );
};

Footer.propTypes = {
  percent: PropTypes.number,
  remaining: PropTypes.number
};

export default Footer;