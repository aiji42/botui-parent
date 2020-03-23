import { deliveryAndPaymentStep } from '../steps';
import checkout from './checkout';


export const paymentMethods = async (data) => {
  if ((await checkout()).hasErrors) {
    await deliveryAndPaymentStep(data);
  }
  const methods = (await checkout()).payment.paymentMethods.filter(method => !method.disabled);
  return methods.reduce((result, method) => ({ ...result, [method.value]: method.displayName}), {});
};

export const isSelectedCredit = async (data) => {
  if ((await checkout()).hasErrors) {
    await deliveryAndPaymentStep(data);
  }
  const credit = (await checkout()).payment.paymentMethods.find(method => method.name === 'creditCard');
  return credit.selected;
};

export const paymentTimeChoices = async (data) => {
  if ((await checkout()).hasErrors) {
    await deliveryAndPaymentStep(data);
  }
  return (await checkout()).payment.creditCard.paymentTypes.reduce(
    (result, { value, label }) => ({ ...result, [value]: label }),
  {});
};