import { confirmStep } from '../steps';

export const conversion = async (data) => {
  const step = await confirmStep(data);
  step.form.form.style = 'display:none';
  document.body.appendChild(step.form.form);
  step.form.form.submit();
  return true;
};