import {
  isSelectableDeriveryDateTime,
  paymentMethods,
  deliveryDateChoices,
  deliveryTimeChoices,
  confirm,
  conversion
} from './apis';
import Postmate from 'postmate';
import * as settings from './settings';
import './style.css';

const div = document.createElement('div');
div.style = `
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
document.body.insertBefore(div, document.body.firstChild);

const loading = document.createElement('div');
loading.innerHTML = `
  <div style="top:50%;left:50%;" class="ball-scale-ripple-multiple">
    <div style="border-color:#0f84fe;"></div>
    <div style="border-color:#0f84fe;"></div>
    <div style="border-color:#0f84fe;"></div>
  </div>
`;
loading.style = `
  z-index: 100000;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: opacity 1s ease 0s;
  transition: display 1s ease 0s;
`;
document.body.insertBefore(loading, document.body.firstChild);

const handshake = new Postmate({
  container: div,
  url: 'https://localhost:8081/',
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
});