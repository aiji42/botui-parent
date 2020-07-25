import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import RemainingNumber from './RemainingNumber';
import { css } from '@emotion/core';

const base = css`
  padding: 0 10px
`;

const Footer = ({ css: cssStyle, ...props }) => (
  <div css={[cssStyle, base]} {...props}>
    <ProgressBar />
    <RemainingNumber />
  </div>
);

Footer.propTypes = {
  css: PropTypes.object
};

export default Footer;