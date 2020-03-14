import React, { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import HandShake from './HandShake';
import Loading from '../Loading';
import Modal from '../Modal';
import Header from './Header';
import Footer from './Footer';
import { css } from '@emotion/core';

const header = css`
  height: 10%;
  height: -webkit-calc(50px) ;
  height: calc(50px);
`;

const handshake = css`
  height: 85%;
  height: -webkit-calc(100% - 50px - 40px) ;
  height: calc(100% - 50px - 40px);
`;

const footer = css`
  height: 5%;
  height: -webkit-calc(40px) ;
  height: calc(40px);
`;

const MainField = () => {
  const [prepared, setPreapred] = useState(false);
  const [percent, setPercent] = useState(0);
  const [remaining, setRemaining] = useState(null);

  const updateFooter = ([percentage, remainingNumber]) => {
    setPercent(percentage);
    setRemaining(remainingNumber);
  };

  return (
    <ErrorBoundary>
      <Loading isProgressing={!prepared} />
      <Modal isOpen={true}>
        <Header css={header} />
        <HandShake onPrepared={() => { setPreapred(true); }}
          updateFooter={updateFooter} css={handshake}
        />
        <Footer percent={percent} remaining={remaining} css={footer} />
      </Modal>
    </ErrorBoundary>
  );
};

export default MainField;