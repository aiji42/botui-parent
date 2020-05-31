import { getSettleEditStep } from '../steps';

export const isSelectableDeliveryMethod = async () => {
  const step = await getSettleEditStep();
  return step.document.querySelectorAll('input[name=deliveryServiceSelect]').length > 1;
};

export const deliveryMethodChoices = async () => {
  const step = await getSettleEditStep();
  if (!isSelectableDeliveryMethod()) return {};
  return Array.from(step.document.querySelectorAll('input[name=deliveryServiceSelect]')).reduce((res, input) => (
    {...res, [input.value]: input.nextSibling.textContent.trim() }
  ), {});
};

const isSelectedExpressDelivery = async (data) => {
  const choices = await deliveryMethodChoices();
  return choices[data.deliveryServiceSelect] === '宅配便';
};

export const isSelectableDeliveryDateTime = async (data) => {
  const step = await getSettleEditStep();
  if (!(await isSelectedExpressDelivery(data))) return false;
  return step.document.querySelectorAll('select[name=deliveryHopeDate] option').length > 1;
};

export const deliveryDateChoices = async (data) => {
  if (!(await isSelectableDeliveryDateTime(data))) return [];
  const step = await getSettleEditStep();
  const options = Array.from(step.document.querySelectorAll('select[name=deliveryHopeDate] option'));
  return options.map(({ value, innerText }) => ({ value, label: innerText.trim() }));
};

export const deliveryTimeChoices = async (data) => {
  if (!(await isSelectableDeliveryDateTime(data))) return [];
  const step = await getSettleEditStep();
  const options = Array.from(step.document.querySelectorAll('select[name=deliveryHopeTime] option'));
  return options.map(({ value, innerText }) => ({ value, label: innerText.trim() }));
};