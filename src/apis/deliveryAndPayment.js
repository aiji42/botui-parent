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

export const paymentMessage = async (data) => {
  const methods = Object.values(await paymentMethods(data));
  if (methods.length > 1) return `${methods.join('、')}の${methods.length}つから選択可能です。`;

  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await checkoutUserInfo(data);
    checkouted = await checkout(data);
  }

  const disabledMethods = checkouted.payment.paymentMethods.filter(({ disabled, disabledMessage }) => disabled && !!disabledMessage);
  return disabledMethods.map(({ disabledMessage }) => {
    const div = document.createElement('div');
    div.innerHTML = disabledMessage;
    return div.innerText.trim();
  }).join('');
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