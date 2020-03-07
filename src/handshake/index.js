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
import * as settings from '../settings';
import loading from '../loading';
import errorHandler from '../errorHandler';

const div = document.createElement('div');
div.classList.add('botui-child-panel');
document.body.insertBefore(div, document.body.firstChild);

const handshake = new Postmate({
  container: div,
  url: process.env.BOTUI_CHILD_ENDPOINT,
  name: 'botui-child',
  classListArray: ['botui-child']
});

const callWrapper = async (caller) => {
  try {
    await caller();
  } catch (e) {
    errorHandler(e);
  }
};

handshake.then(child => {
  child.call('setting', settings);
  child.frame.setAttribute('height', '100%');
  child.frame.setAttribute('width', '100%');
  child.frame.setAttribute('frameborder', 'no');

  child.on('readyToStartChat', () => {
    child.call('startChat');
    loading.style.opacity = 0;
    loading.style.display = 'none';
  });

  child.on('doNotStartChat', () => {
    child.destroy();
    loading.style.opacity = 0;
    loading.style.display = 'none';
  });

  child.on('isSelectableDeriveryDateTime', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['isSelectableDeriveryDateTime', await isSelectableDeriveryDateTime(data)]);
    });
  });

  child.on('paymentMethods', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['paymentMethods', await paymentMethods(data)]);
    });
  });

  child.on('deliveryDateChoices', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['deliveryDateChoices', await deliveryDateChoices(data)]);
    });
  });

  child.on('deliveryTimeChoices', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['deliveryTimeChoices', await deliveryTimeChoices(data)]);
    });
  });

  child.on('isCashLess', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['isCashLess', data.payment === '5']);
    });
  });

  child.on('confirm', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['confirm', await confirm(data)]);
    });
  });

  child.on('conversion', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['conversion', await conversion(data)]);
    });
  });

  child.on('shouldGoPaymentPage', (data) => {
    callWrapper(async () => {
      child.call('publishMessage', ['shouldGoPaymentPage', await shouldGoPaymentPage(data)]);
    });
  });
});

export default handshake;