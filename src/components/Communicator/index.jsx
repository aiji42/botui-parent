import React, { useState } from 'react';
import { PostRobotContext } from 'react-hook-post-robot';

const Communicator = (props) => {
  const [ targetWindow, setTargetWindow ] = useState(window);
  return (
    <PostRobotContext.Provider value={{ window: targetWindow, init: setTargetWindow }} {...props} />
  );
};

export default Communicator;