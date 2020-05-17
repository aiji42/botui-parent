import { ShamWindow } from '../shams';
import * as libphonenumber from 'libphonenumber-js';

const convertPrefCode = (pref) => [
  '00101', '00202', '00204', '00305', '00203', '00306', '00307', '00408', '00409', '00410',
  '00411', '00412', '00414', '00413', '00516', '00722', '00723', '00724', '00415', '00517',
  '00621', '00618', '00619', '00620', '00827', '00826', '00825', '00830', '00828', '00829',
  '00934', '00935', '00931', '00932', '00933', '01037', '01036', '01038', '01039', '01140',
  '01141', '01142', '01143', '01144', '01145', '01146', '01247'
][pref - 1];

const makeUserInfo = (data) => {
  const [tel1, tel2, tel3] = (new libphonenumber.AsYouType('JP').input(data.tel)).split('-');
  return {
    lastName: data.familyName,
    lastNameKana: data.familyNameKana,
    firstName: data.firstName,
    firstNameKana: data.firstNameKana,
    zipCodeFront: data.postalCode.slice(0, 3),
    zipCodeBack: data.postalCode.slice(3),
    prefecture: convertPrefCode(data.pref),
    addressLine1: data.city,
    addressLine2: data.street,
    phoneNumberPublic: tel1,
    phoneNumberLocal: tel2,
    phoneNumberMember: tel3,
    email: data.email,
    emailConfirmation: data.email,
    newsletter: data.newsletter
  };
};

const makeSettleInfo = (data) => (
  {
    settleTypeSelect: data.settleTypeSelect,
    cardTypeSelect: 'n', // 常に新規カード
    payment: data.payment || '01',
    token: (data.creditToken && data.creditToken.token) || '',
    validity: (data.creditToken && data.creditToken.validity) || '',
    maskedPan: (data.creditToken && data.creditToken.maskedpan) || '',
    order: ''
  }
);

export const guestEntryStep = async () => {
  const res = await fetch('/fs/primedirect/GuestEntry.html');
  const document = await ShamWindow.getDocumentFromResponse(res);
  const form = document.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document, url: res.url });
  return step;
};

const deliveryEditStep = async (data) => {
  const step = await guestEntryStep();
  step.form.append({ ...makeUserInfo(data), deliveryEdit: 'お届け先指定' });
  try {
    await step.forward({ selector: 'form[name=form]' });
  } catch (_) {
    console.log(_);
    // return deliveryEditStep(data);
  }
  return step;
};

export const settleEditStep = async (data) => {
  const step = await deliveryEditStep(data);
  step.form.append({ shippingAddress: 0, deliveryInputSubmit: '' }); // 自宅を自動選択
  try {
    await step.forward({ selector: 'form[name=form]' });
  } catch (_) {
    console.log(_);
    // return settleEditStep(data);
  }
  return step;
};

export const confirmStep = async (data) => {
  const step = await settleEditStep(data);
  step.form.append({ ...makeSettleInfo(data), order: '' });
  try {
    await step.forward({ selector: 'form[name=form]' });
  } catch (_) {
    console.log(_);
    // return confirmStep(data);
  }
  return step;
};
