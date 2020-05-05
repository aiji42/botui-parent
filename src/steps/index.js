import { ShamWindow } from '../shams';
import * as libphonenumber from 'libphonenumber-js';
import { isSelectableDeriveryDateTime } from '../apis';

const makeUserInfo = (data) => {
  const [tel1, tel2, tel3] = (new libphonenumber.AsYouType('JP').input(data.tel)).split('-');
  return {
    'order_name01': data.familyName,
    'order_kana01': data.familyNameKana,
    'order_name02': data.firstName,
    'order_kana02': data.firstNameKana,
    'order_zip01': data.postalCode.slice(0, 3),
    'order_zip02': data.postalCode.slice(3),
    'order_pref': data.pref,
    'order_addr01': data.city,
    'order_addr02': data.street,
    'order_tel01': tel1,
    'order_tel02': tel2,
    'order_tel03': tel3,
    'order_year': data.birthdayYear,
    'order_month': data.birthdayMonth,
    'order_day': data.birthdayDay,
    'order_email': data.email,
    'order_email02': data.email,
    'order_sex': data.gender,
    'order_mailmaga_flg': data.mailmagazine === 'true' ? '2' : '',
  };
};

const makeDeliveryAndPayment = (data) => (
  {
    'payment_id': data.payment,
    'deliv_date0': data.deliveryDate,
    'deliv_time_id0': data.deliveryTime
  }
);

export const userInfoStep = async () => {
  const res = await fetch(/shopping/);
  const document = await ShamWindow.getDocumentFromResponse(res);
  const form = document.querySelector('form[name=member_form2]');
  const step = new ShamWindow({ form, document, url: res.url });
  try {
    await step.forward({ selector: 'form[name=form1]' });
  } catch (_) {
    return userInfoStep();
  }
  return step;
};

export const deliveryAndPaymentStep = async (data) => {
  const step = await userInfoStep();
  step.form.append(makeUserInfo(data), true);
  try {
    await step.forward({ selector: 'form[name=form1]' });
  } catch (_) {
    return deliveryAndPaymentStep(data);
  }
  return step;
};

export const confirmStep = async (data) => {
  const step = await deliveryAndPaymentStep(data);
  const deliveryAndPayment = makeDeliveryAndPayment(data);
  if (!await isSelectableDeriveryDateTime(data)) {
    delete deliveryAndPayment.deliv_date0;
    delete deliveryAndPayment.deliv_time_id0;
  }
  step.form.append(deliveryAndPayment);
  try {
    await step.forward({ selector: 'form' });
  } catch (_) {
    return confirmStep(data);
  }
  return step;
};
