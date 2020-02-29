import { deliveryAndPaymentStep } from '../steps';
import { ShamWindow, ShamForm } from '../shams';

const cache = [];

const deliveryAndPayment = async (data) => {
  if (cache.length > 0) return cache[0];

  const step = await deliveryAndPaymentStep(data);
  const { form } = step;

  const shamForm = new ShamForm(document.createElement('form'));
  shamForm.append({
    mode: 'select_deliv',
    deliv_id: form.data.get('deliv_id'),
    transactionid: form.data.get('transactionid'),
  });
  const res = await ShamWindow.post({ url: '/shopping/payment.php', body: shamForm.requestBody });
  const json = JSON.parse(await res.text());

  const payment = json.arrPayment
    .reduce((result, { payment_id: paymentId, payment_method: paymentMethod }) => ({
      ...result, [paymentId]: paymentMethod,
    }), {});
  const isSelectable = form.data.has('deliv_date0');
  const { deliv_date0: delivDate0 } = form.elements;
  const deliveryDate = Array.from((delivDate0 && delivDate0.options) || [])
    .reduce((result, { value, innerText }) => ({ ...result, [value]: innerText }), {});
  const deliveryTime = json.arrDelivTime
    .reduce((result, value, index) => ({ ...result, [index]: value }), {});

  cache.push({
    payment, isSelectable, deliveryDate, deliveryTime,
  });
  return cache[0];
};

export const isSelectableDeriveryDateTime = async (data) => {
  if (cache.length > 0) return cache[0]['isSelectable'];
  return (await deliveryAndPayment(data))['isSelectable'];
};

export const paymentMethods = async (data) => {
  if (cache.length > 0) return cache[0]['payment'];
  return (await deliveryAndPayment(data))['payment'];
};

export const deliveryDateChoices = async (data) => {
  if (cache.length > 0) return cache[0]['deliveryDate'];
  return (await deliveryAndPayment(data))['deliveryDate'];
};

export const deliveryTimeChoices = async (data) => {
  if (cache.length > 0) return cache[0]['deliveryTime'];
  return (await deliveryAndPayment(data))['deliveryTime'];
};