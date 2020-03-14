import React, { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import HandShake from '../HandShake';
import Loading from '../Loading';
import Modal from '../Modal';
import Header from '../Header';
import Footer from '../Footer';
import { css } from '@emotion/core';

const handshake = css`
  width: 100%;
  height: 100%;
  padding: 60px 0 30px 0;
`;

const MainField = () => {
  const [prepared, setPreapred] = useState(false);
  const [percentage, setPercentage] = useState('0%');
  const [remaining, setRemaining] = useState(null);

  const updateFooter = ([percent, remainingNumber]) => {
    setPercentage(`${percent}%`);
    setRemaining(remainingNumber);
  };

  return (
    <ErrorBoundary>
      <Loading isProgressing={!prepared} />
      <Modal isOpen={true}>
        <Header />
        <div css={handshake}>
          <HandShake onPrepared={() => { setPreapred(true); }} updateFooter={updateFooter} />
        </div>
        <Footer percentage={percentage} remaining={remaining} />
      </Modal>
    </ErrorBoundary>
  );
};

export default MainField;