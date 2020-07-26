import React, { useContext } from 'react';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
import { css } from '@emotion/core';
import { ChatBotContext } from '../ChatBot';

const header = css`
  height: 10%;
  height: -webkit-calc(50px) ;
  height: calc(50px);
`;

const body = css`
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
  const { loading } = useContext(ChatBotContext);

  return (
    <>
      {loading && <Loading />}
      <Header css={header} />
      <Body css={body} />
      <Footer css={footer} />
    </>
  );
};

export default MainField;