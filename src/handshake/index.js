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

const div = document.createElement('div');
div.classList.add('botui-child-panel');
document.body.insertBefore(div, document.body.firstChild);

const handshake = new Postmate({
  container: div,
  url: 'https://gifted-morse-5185fa.netlify.com',
  name: 'botui-child',
  classListArray: ['botui-child']
});

handshake.then(child => {
  child.call('setting', settings);
  child.frame.setAttribute('height', '100%');
  child.frame.setAttribute('width', '100%');
  child.frame.setAttribute('frameborder', 'no');

  child.on('readyToChatStart', () => {
    child.call('chatStart');
    loading.style.opacity = 0;
    loading.style.display = 'none';
  });

  child.on('isSelectableDeriveryDateTime', async (data) => {
    child.call('publishMessage', ['isSelectableDeriveryDateTime', await isSelectableDeriveryDateTime(data)]);
  });

  child.on('paymentMethods', async (data) => {
    child.call('publishMessage', ['paymentMethods', await paymentMethods(data)]);
  });

  child.on('deliveryDateChoices', async (data) => {
    child.call('publishMessage', ['deliveryDateChoices', await deliveryDateChoices(data)]);
  });

  child.on('deliveryTimeChoices', async (data) => {
    child.call('publishMessage', ['deliveryTimeChoices', await deliveryTimeChoices(data)]);
  });

  child.on('isCashLess', async (data) => {
    child.call('publishMessage', ['isCashLess', data.payment === '5']);
  });

  child.on('confirm', async (data) => {
    child.call('publishMessage', ['confirm', await confirm(data)]);
  });

  child.on('conversion', async (data) => {
    child.call('publishMessage', ['conversion', await conversion(data)]);
  });

  child.on('shouldGoPaymentPage', async (data) => {
    child.call('publishMessage', ['shouldGoPaymentPage', await shouldGoPaymentPage(data)]);
  });
});

export default handshake;