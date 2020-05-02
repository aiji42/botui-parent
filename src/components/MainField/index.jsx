import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
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

const MainField = ({ handshakeChild, handshakeElement }) => {
  const [loading, setLoading] = useState(true);
  const onReady =  useCallback(() => { setLoading(false); }, []);
  return (
    <>
      {loading && <Loading />}
      <Header css={header} />
      <Body handshakeChild={handshakeChild} handshakeElement={handshakeElement} onReady={onReady} css={handshake} />
      <Footer handshakeChild={handshakeChild} css={footer} />
    </>
  );
};

MainField.propTypes = {
  handshakeChild: PropTypes.object,
  handshakeElement: PropTypes.object
};

export default MainField;