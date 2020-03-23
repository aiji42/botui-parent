import { ShamWindow } from '../shams';

const convertPrefId = (id) => {
  return [
    '01', '02', '04', '05', '03', '06', '07', '08', '09', '10',
    '11', '12', '14', '13', '16', '22', '23', '24', '15', '17',
    '21', '18', '19', '20', '27', '26', '25', '30', '28', '29',
    '34', '35', '31', '32', '33', '37', '36', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47'
  ][id - 1];
};

const makeUserInfo = (data) => {
  return {
    // 'registrationType': 'regular', // 固定？
    // 'action': 'checkout', // 固定？
    // 'membershipCardAuth': false, // 固定？
    'items.name.lastName': data.familyName,
    'items.name.firstName': data.firstName,
    'items.nameKana.lastName': data.familyNameKana,
    'items.nameKana.firstName': data.firstNameKana,
    'items.zipCode': `${data.postalCode.slice(0, 3)}-${data.postalCode.slice(3)}`,
    'items.prefecture': convertPrefId(data.pref),
    'items.addressLine1': data.city,
    'items.addressLine2': data.street,
    'items.addressLine3': '',
    'items.phoneNumber': data.tel,
    'items.email': data.email,
    // 'registerAccount': 'on',  // offはプロパティごと消す
    'password': 'fftyrjctcrxhtjctky',
    'subscribeToNewsletter': data.mailmagazine === 'true' ? 'on' : 'off', // offはプロパティごと消す
    'privacyPolicyAgreed': 'on',
  };
};

export const userInfoStep = async () => {
  const res = await fetch('/p/customer-details');
  const doc = await ShamWindow.getDocumentFromResponse(res);
  const form = doc.querySelector('form#fs_form');
  const step = new ShamWindow({ form, doc, url: res.url });
  return step;
};

export const deliveryAndPaymentStep = async (data) => {
  const step = await userInfoStep();
  if (step.url.includes('/p/customer-details')) {
    step.form.append(makeUserInfo(data), true);
    step.form.delete('registerAccount');
    await step.forward({});
  }
};
