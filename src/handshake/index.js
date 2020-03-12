import {
  isSelectableDeriveryDateTime,
  paymentMethods,
  deliveryDateChoices,
  deliveryTimeChoices,
  confirm,
  conversion,
  shouldGoPaymentPage
} from '../apis';
import Postmate from 'postmate';
import * as setting from '../settings';
import loading from '../loading';
import errorBoundary from '../errorBoundary';
import { saveStoreValue, findStoredValue } from '../dataStore';
import { dataLayerBotui } from '../gtm';

const shouldStartChat = ({ activateRate }) => {
  return saveStoreValue('activeate', findStoredValue('activeate', Math.random() <= activateRate));
};

dataLayerBotui.push({
  event: 'analytics', eventCategory: 'botui-parent', eventAction: 'activate',
  eventLabel: shouldStartChat(setting) ? 'true' : 'false',
});

let handshake = new Promise(() => { });
if (shouldStartChat(setting)) {
  const div = document.createElement('div');
  div.classList.add('botui-child-panel');
  document.body.insertBefore(div, loading.nextSibling);

  handshake = new Postmate({
    container: div,
    url: process.env.BOTUI_CHILD_ENDPOINT,
    name: 'botui-child',
    classListArray: ['botui-child'],
    model: { setting }
  });
} else {
  document.body.removeChild(loading);
}

(async () => {
  const child = await handshake;

  child.frame.setAttribute('height', '100%');
  child.frame.setAttribute('width', '100%');
  child.frame.setAttribute('frameborder', 'no');

  child.on('readyToStartChat', () => {
    child.call('startChat');
    document.body.removeChild(loading);
  });

  child.on('dataLayerPush', (data) => {
    errorBoundary(async () => {
      dataLayerBotui.push(data);
    });
  });

  child.on('isSelectableDeriveryDateTime', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['isSelectableDeriveryDateTime', await isSelectableDeriveryDateTime(data)]);
    });
  });

  child.on('paymentMethods', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['paymentMethods', await paymentMethods(data)]);
    });
  });

  child.on('deliveryDateChoices', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['deliveryDateChoices', await deliveryDateChoices(data)]);
    });
  });

  child.on('deliveryTimeChoices', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['deliveryTimeChoices', await deliveryTimeChoices(data)]);
    });
  });

  child.on('isCashLess', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['isCashLess', data.payment === '5']);
    });
  });

  child.on('confirm', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['confirm', await confirm(data)]);
    });
  });

  child.on('conversion', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['conversion', await conversion(data)]);
    });
  });

  child.on('shouldGoPaymentPage', (data) => {
    errorBoundary(async () => {
      child.call('publishMessage', ['shouldGoPaymentPage', await shouldGoPaymentPage(data)]);
    });
  });
})();