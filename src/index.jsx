import React from 'react';
import ReactDOM from 'react-dom';
import { saveStoreValue, findStoredValue } from './dataStore';
import { dataLayerBotui } from './gtm';
import MainField from './components/MainField';
import { launchCondition } from './settings';
import './style.scss';

const shouldStartChat = () => {
  return saveStoreValue('activeate',
    findStoredValue('activeate',
      Math.random() <= process.env.BOTUI_ACTIVATE_RATE
    )
  );
};

if (launchCondition) {
  dataLayerBotui.push({
    event: 'analytics', eventCategory: 'botui-parent', eventAction: 'activate',
    eventLabel: shouldStartChat() ? 'true' : 'false',
  });

  if (shouldStartChat()) {
    const rootElment = document.createElement('div');
    rootElment.id = 'root';
    document.body.insertBefore(rootElment, document.body.firstChild);

    ReactDOM.render(<MainField />, document.querySelector('#root'));
  }
}