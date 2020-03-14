import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import HashLoader from 'react-spinners/HashLoader';

const base = css`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const style = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
`;

const Loading = ({ isProgressing }) => {
  return (
    <div css={isProgressing ? base : ''}>
      <div css={style}>
        <HashLoader
          loading={isProgressing}
          size={50}
          color="#0f84fe"
        />
      </div>
    </div>
  );
};

Loading.propTypes = {
  isProgressing: PropTypes.bool.isRequired
};

export default Loading;