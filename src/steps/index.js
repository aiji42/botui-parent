import { ShamWindow, ShamForm } from '../shams';
import PhoneNumber from 'awesome-phonenumber';
import axios from 'axios';
import * as rax from 'retry-axios';
const axiosInstance = axios.create({ timeout: 5000 });
axiosInstance.defaults.raxConfig = {
  instance: axiosInstance,
  retry: 4,
  noResponseRetries: 4,
  retryDelay: 1000
};
rax.attach(axiosInstance);

const zeroPadding = (num, length) => `0000000000${num}`.slice(-length);

const convertPrefCode = (pref) => [
  '00101', '00202', '00204', '00305', '00203', '00306', '00307', '00408', '00409', '00410',
  '00411', '00412', '00414', '00413', '00516', '00722', '00723', '00724', '00415', '00517',
  '00621', '00618', '00619', '00620', '00827', '00826', '00825', '00830', '00828', '00829',
  '00934', '00935', '00931', '00932', '00933', '01037', '01036', '01038', '01039', '01140',
  '01141', '01142', '01143', '01144', '01145', '01146', '01247'
][pref - 1];

const makeUserInfo = (data) => {
  const [tel1, tel2, tel3] = new PhoneNumber(data.tel, 'JP').getNumber('national').split('-');
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
    birthdayYear: data.birthdayYear,
    birthdayMonth: zeroPadding(data.birthdayMonth, 2),
    birthdayDay: zeroPadding(data.birthdayDay, 2),
    email: data.email,
    emailConfirmation: data.email,
    newsletter: data.newsletter
  };
};

const makeMemberInfo = (data) => ({
  ...makeUserInfo(data),
  password: data.password,
  passwordConfirmation: data.password,
  privacyAgree: data.privacyAgree
});

const makeSettleInfo = (data) => {
  const settleInfo = {
    settleTypeSelect: data.settleTypeSelect,
    cardTypeSelect: 'n', // 常に新規カード
    payment: data.paymentTime || '01',
    token: (data.creditToken && data.creditToken.token) || '',
    validity: (data.creditToken && data.creditToken.validity) || '',
    maskedPan: (data.creditToken && data.creditToken.maskedpan) || '',
    deliveryHopeDate: data.deliveryHopeDate || '',
    deliveryHopeTime: data.deliveryHopeTime || '',
    pointSelect: data.pointSelect || '',
    usePoint: data.usePoint || '',
    communication: data.communication || '',
    order: ''
  };
  return data.deliveryServiceSelect ? { ...settleInfo, deliveryServiceSelect: data.deliveryServiceSelect } : settleInfo;
};

export const guestEntryStep = async () => {
  const res = await axiosInstance.get('/fs/primedirect/GuestEntry.html');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document: doc, url: res.request.responseURL });
  return step;
};

export const memberEntryStep = async () => {
  const res = await axiosInstance.get('/fs/primedirect/MemberEntryEdit.html');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document: doc, url: res.request.responseURL });
  return step;
};

export const memberEditStep = async () => {
  const res = await axiosInstance.get('/fs/primedirect/EntryEdit.html');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document: doc, url: res.request.responseURL });
  return step;
};

const deliveryEditStep = async () => {
  const res = await axiosInstance.get('/fs/primedirect/DeliveryEdit.html');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document: doc, url: res.request.responseURL });
  return step;
};

export const settleEditStep = async () => {
  const res = await axiosInstance.get('/fs/primedirect/SettleEdit.html');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document: doc, url: res.request.responseURL });
  return step;
};

const orderConfirmStep = async () => {
  const res = await axiosInstance.get('/fs/primedirect/OrderConfirm.html');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form[name=form]');
  const step = new ShamWindow({ form, document: doc, url: res.request.responseURL });
  return step;
};

let currentStep = null;
export const getCurrentStep = () => currentStep;

export const getSettleEditStep = async () => {
  if (currentStep.url.includes('/SettleEdit.html')) return currentStep;
  currentStep = await settleEditStep();
  return currentStep;
};

export const getConfirmStep = async () => {
  if (currentStep.url.includes('/OrderConfirm.html')) return currentStep;
  currentStep = await orderConfirmStep();
  return currentStep;
};

export const goToSettleEditStepGuest = async (data) => {
  currentStep = await guestEntryStep();
  currentStep.form.append({ ...makeUserInfo(data), deliveryEdit: '' });
  await currentStep.forward();
  currentStep = await deliveryEditStep();
  currentStep.form.append({ shippingAddress: 0, deliveryInputSubmit: '' });
  await currentStep.forward();
  currentStep = await settleEditStep();
};

export const goToSettleEditStepMember = async (data) => {
  if (!currentStep) {
    const step = await memberEntryStep();
    step.form.append({ ...makeMemberInfo(data), confirm: '' });
    await step.forward();
    // メアド重複
    if (step.url.includes('/MemberEntryEdit.html')) {
      const error = step.document.querySelector('.error_content').innerText.trim();
      throw new Error(error);
    }
    currentStep = step;
  } else {
    currentStep = await memberEditStep();
    currentStep.form.append({ ...makeUserInfo(data), confirm: '' });
    await currentStep.forward({ selector: 'form[name=form]' });
    currentStep.form.append({ modifyDecide: '' });
    await currentStep.forward();
  }
  currentStep = await deliveryEditStep();
  currentStep.form.append({ shippingAddress: 0, deliveryInputSubmit: '' });
  await currentStep.forward();
  currentStep = await settleEditStep();
};

export const goToConfirmStep = async (data) => {
  currentStep = await settleEditStep();
  currentStep.form = new ShamForm(currentStep.document.querySelector('form[name=form]'));
  currentStep.form.append({ ...makeSettleInfo(data), order: '' });
  await currentStep.forward();
};