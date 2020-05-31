import { memberEntryStep } from '../steps';

export const isMemberEntry = () => location.href.includes('/MemberEntryEdit.html');

const hasAlreadyRegistered = async () => {
  const step = await memberEntryStep();
  return !!step.document.querySelector('form[name=form][action$="MyPageTop.html"]');
};

export const isInputablePassword = async () => isMemberEntry() && !(await hasAlreadyRegistered());

export const isInputablePrivacyAgree = async () => isMemberEntry() && !(await hasAlreadyRegistered());