import Postmate from 'postmate';
import * as setting from '../settings';
import actions from './actions';
import bugsnagClient from '../bugsnagClient';

const shakes = [];
export default (targetEl) => {
  if (shakes[0]) return shakes[0];
  shakes[0] = new Postmate({
    container: targetEl,
    url: process.env.BOTUI_CHILD_ENDPOINT,
    name: 'botui-child',
    classListArray: ['botui-child'],
    model: { setting }
  });
  prepare();
  return shakes[0];
};

const prepare = async () => {
  const child = await shakes[0];

  Object.keys(actions).forEach(key => {
    const action = actions[key];
    child.on(key, async (data) => {
      try {
        child.call('publishMessage', [key, await action(data)]);
      } catch (e) {
        console.error(e);
        bugsnagClient.notify(e);
      }
    });
  });
};