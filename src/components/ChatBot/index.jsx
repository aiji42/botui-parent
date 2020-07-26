import React, { createContext, useState, useRef } from 'react';
import { usePostRobotOn } from 'react-hook-post-robot';
import * as setting from '../../settings';
import actions from '../../actions';
import { percentage, remainingNumber, dataLayerPush } from './modules';

export const ChatBotContext = createContext();

const ChatBot = (props) => {
  const [state, setState] = useState({ percentage: 100, remaining: null});
  const loading = useRef(true);

  usePostRobotOn('onReady', () => {
    loading.current = false;
    return setting;
  }, []);

  usePostRobotOn('updateStatus', ({ data }) => {
    dataLayerPush(data);
    setState({ ...state, percentage: percentage(data), remaining: remainingNumber(data) });
  }, []);

  usePostRobotOn('emit', async ({ data: { key, data } }) => await actions[key](data), []);

  return (
    <ChatBotContext.Provider value={{ ...state, loading: loading.current }} {...props} />
  );
};

export default ChatBot;