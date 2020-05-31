import { getConfirmStep } from '../steps';

export const conversion = async () => {
  const step = await getConfirmStep();
  const form = step.document.querySelector('form[name=form]');
  form.style.display = 'none';
  form.appendChild(createAdditionalInput());
  document.body.appendChild(form);
  setTimeout(() => { form.submit(); }, 3000);
  return '購入処理のため、自動的にページを移動します。';
};

const createAdditionalInput = () => {
  const input = document.createElement('input');
  input.name = 'order';
  input.value = '';
  input.type = 'hidden';
  return input;
};