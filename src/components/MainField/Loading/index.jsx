import React from 'react';
import { css } from '@emotion/core';
import HashLoader from 'react-spinners/HashLoader';

const base = css`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const style = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
`;

const Loading = () => {
  return (
    <div css={base}>
      <div css={style}>
        <HashLoader loading size={50} color="#0f84fe"/>
      </div>
    </div>
  );
};

export default Loading;