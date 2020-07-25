import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { ChatBotContext } from '../../../ChatBot';

const span = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.9em;
  line-height: 0.9em;
  text-align: center;
  color: gray;
`;

const RemainingNumber = () => {
  const { remaining } = useContext(ChatBotContext);

  return (
    <div css={span}>{!!remaining && `のこり${remaining}問で完了`}</div>
  );
};

export default RemainingNumber;