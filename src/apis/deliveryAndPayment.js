import { checkoutUserInfo } from './userInfo';
import checkout from './checkout';


export const paymentMethods = async (data) => {
  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await checkoutUserInfo(data);
    checkouted = await checkout(data);
  }

  const methods = checkouted.payment.paymentMethods.filter(method => !method.disabled);
  return methods.reduce((result, method) => ({ ...result, [method.value]: method.displayName}), {});
};

export const isSelectedCredit = async (data) => {
  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await checkoutUserInfo(data);
    checkouted = await checkout(data);
  }

  const credit = checkouted.payment.paymentMethods.find(method => method.name === 'creditCard');
  return credit.selected;
};

export const paymentTimeChoices = async (data) => {
  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await checkoutUserInfo(data);
    checkouted = await checkout(data);
  }

  return checkouted.payment.creditCard.paymentTypes.reduce(
    (result, { value, label }) => ({ ...result, [value]: label }),
  {});
};