import { conversionStep, confirmStep } from '../steps';
import { isSelectedRakutenPay } from './payment';

export const conversion = async (data) => {
  if (await isSelectedRakutenPay(data)) return await rakutenPayConversion(data);

  const step = await confirmStep(data);
  const form = step.document.querySelector('form[name=form]');
  form.style.display = 'none';
  form.appendChild(createAdditionalInput());
  document.body.appendChild(form);
  setTimeout(() => { form.submit(); }, 3000);
  return '購入処理のため、自動的にページを移動します。';
};

const rakutenPayConversion = async (data) => {
  const step = await conversionStep(data);
  const form = step.document.querySelector('form');
  form.style.display = 'none';
  document.body.appendChild(form);
  setTimeout(() => { form.submit(); }, 3000);
  return '楽天ペイ画面へ遷移します。';
};

const createAdditionalInput = () => {
  const input = document.createElement('input');
  input.name = 'order';
  input.value = '';
  input.type = 'hidden';
  return input;
};