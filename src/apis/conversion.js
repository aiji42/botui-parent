import { conversionStep, confirmStep } from '../steps';
import { isSelectedRakutenPay, isSelectedCreditCard } from './payment';

export const conversion = async (data) => {
  if (await isSelectedRakutenPay(data)) return await rakutenPayConversion(data);

  if (await isSelectedCreditCard(data)) return await creditConversion(data);

  return await cashConversion(data);
};

const cashConversion = async (data) => {
  const step = await confirmStep(data);
  const form = step.document.querySelector('form[name=form]');
  form.style.display = 'none';
  form.appendChild(createAdditionalInput());
  document.body.appendChild(form);
  setTimeout(() => { form.submit(); }, 3000);
  return '完了ページへ遷移します。';
};

const rakutenPayConversion = async (data) => {
  const step = await conversionStep(data);
  const form = step.document.querySelector('form');
  form.style.display = 'none';
  document.body.appendChild(form);
  setTimeout(() => { form.submit(); }, 3000);
  return '楽天ペイ画面へ遷移します。';
};

const creditConversion = async (data) => {
  const step = await conversionStep(data);
  // // クレカ等にエラーが生じているとき
  const error = step.document.querySelector('.error_content');
  if (error && error.innerText.trim()) return error.innerText.trim();
  return '後で実装するわ';
};

const createAdditionalInput = () => {
  const input = document.createElement('input');
  input.name = 'order';
  input.value = '';
  input.type = 'hidden';
  return input;
};