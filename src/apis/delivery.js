import { settleEditStep } from '../steps';

export const isSelectableDeliveryDateTime = async (data) => {
  const step = await settleEditStep(data);
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