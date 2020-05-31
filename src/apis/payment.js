import { getSettleEditStep } from '../steps';

const loadJsForCreditToken = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://ssl.f-regi.com/token/static/base.js';
  document.body.appendChild(script);
  // window.FRToken が使えるようになる
};
loadJsForCreditToken();

export const paymentMethods = async () => {
  const step = await getSettleEditStep();
  const { document: shamDocument } = step;
  const inputs = Array.from(shamDocument.body.querySelectorAll('input[name=settleTypeSelect]'));
  return inputs.reduce((res, input) => ({ ...res, [input.value]: input.parentElement.innerText.trim() }), {});
};

export const isSelectedCreditCard = async (data) => (await paymentMethods())[data.settleTypeSelect] === 'クレジットカード決済';
export const isSelectedRakutenPay = async (data) => (await paymentMethods())[data.settleTypeSelect] === '楽天ペイ';

export const paymentTimeChoices = async () => {
  const step = await getSettleEditStep();
  const { document: shamDocument } = step;
  const options = Array.from(shamDocument.body.querySelectorAll('select[name=payment] option'));
  return options.map(({ value, innerText }) => ({ value, label: innerText.trim() }));
};

export const creditToken = async (data) => {
  const shopId = getShopId(data);
  const { cardobject } = await new Promise(resolve => {
    window.thisIsDummyCallback = resolve;
    window.FRToken.getToken(shopId, '', makeCardInfo(data), 'thisIsDummyCallback');
  });
  return cardobject;
};

const getShopId = (data) => {
  // TODO: DOMからSHOP_IDをパース
  return 'C060568';
};

const makeCardInfo = ({ creditCardNumber, creditCardExpiryYear, creditCardExpiryMonth, creditCardName, creditCardCvc }) => ({
  pan: creditCardNumber,
  expiry_mm: creditCardExpiryMonth,
  expiry_yy: `${creditCardExpiryYear}`.slice(-2),
  cardname: creditCardName,
  scode: creditCardCvc
});