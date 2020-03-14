import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const base = css`
  background-color: #20224a;
  opacity: 0.8;
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const remainingNumber = css`
  position: fixed;
  bottom: 0;
  right: 0;
  color: white;
  margin-bottom: 2px;
`;

const Footer = ({ percentage, remaining }) => {
  return (
    <>
      <div css={[base, { opacity: 1, backgroundColor: 'white' }]} />
      <div css={base} />
      <div css={[base, { opacity: 1, width: percentage }]} />
      <div css={remainingNumber}>{!!remaining && `のこり${remaining}問で完了！`}</div>
    </>
  );
};

Footer.propTypes = {
  percentage: PropTypes.string,
  remaining: PropTypes.number
};

export default Footer;