import { conversionStep } from '../steps';

export const conversion = async (data) => {
  const step = await conversionStep(data);
  console.log(step.url);

  // クレカ等にエラーが生じているとき
  const error = step.document.querySelector('.error_content');
  if (error && error.innerText.trim()) return error.innerText.trim();

  // 楽天ペイ
  const rakutenForm = step.document.querySelector('form[action^="https://my.checkout.rakuten.co.jp"]');
  if (rakutenForm) {
    rakutenForm.id = 'thisIsRakutenPaymentForm';
    rakutenForm.style.display = 'none';
    document.body.appendChild(rakutenForm);
    setTimeout(() => { rakutenForm.submit(); }, 3000);
    return '楽天ペイ画面へ遷移します。';
  }

  return true;
};