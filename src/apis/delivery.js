import { settleEditStep } from '../steps';

export const isSelectableDeliveryMethod = async (data) => {
  const step = await settleEditStep(data);
  return step.document.querySelectorAll('input[name=deliveryServiceSelect]').length > 1;
};

export const deliveryMethodChoices = async (data) => {
  const step = await settleEditStep(data);
  if (!(await isSelectableDeliveryMethod(data))) return {};
  return Array.from(step.document.querySelectorAll('input[name=deliveryServiceSelect]')).reduce((res, input) => (
    {...res, [input.value]: input.nextSibling.textContent.trim() }
  ), {});
};

const isSelectedExpressDelivery = async (data) => {
  const choices = await deliveryMethodChoices(data);
  return choices[data.deliveryServiceSelect] === '宅配便';
};

export const isSelectableDeliveryDateTime = async (data) => {
  const step = await settleEditStep(data);
  if (!(await isSelectedExpressDelivery(data))) return false;
  return step.document.querySelectorAll('select[name=deliveryHopeDate] option').length > 1;
};

export const deliveryDateChoices = async (data) => {
  if (!(await isSelectableDeliveryDateTime(data))) return [];
  const step = await settleEditStep(data);
  const options = Array.from(step.document.querySelectorAll('select[name=deliveryHopeDate] option'));
  return options.map(({ value, innerText }) => ({ value, label: innerText.trim() }));
};

export const deliveryTimeChoices = async (data) => {
  if (!(await isSelectableDeliveryDateTime(data))) return [];
  const step = await settleEditStep(data);
  const options = Array.from(step.document.querySelectorAll('select[name=deliveryHopeTime] option'));
  return options.map(({ value, innerText }) => ({ value, label: innerText.trim() }));
};