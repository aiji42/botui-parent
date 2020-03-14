import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './PregressBar';
import { css } from '@emotion/core';

const base = css`
  padding: 0 10px
`;

const span = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.9em;
  line-height: 0.9em;
  text-align: right;
  color: gray;
`;

const Footer = ({ percent, remaining, css: cssStyle, ...props }) => {
  return (
    <div css={[cssStyle, base]} {...props}>
      <ProgressBar percent={percent} />
      <div css={span}>{!!remaining && `のこり${remaining}問で完了！`}</div>
    </div>
  );
};

Footer.propTypes = {
  percent: PropTypes.number,
  remaining: PropTypes.number,
  css: PropTypes.object
};

export default Footer;