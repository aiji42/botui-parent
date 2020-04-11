import shamWindow from '../shams/ShamWindow';
import shamForm from '../shams/ShamForm';

const convertPrefId = (id) => {
  return [
    '01', '02', '04', '05', '03', '06', '07', '08', '09', '10',
    '11', '12', '14', '13', '16', '22', '23', '24', '15', '17',
    '21', '18', '19', '20', '27', '26', '25', '30', '28', '29',
    '34', '35', '31', '32', '33', '37', '36', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47'
  ][id - 1];
};

const createForm = (data) => {
  const form = new shamForm(document.createElement('form'));
  form.append({
    'registrationType': 'regular',
    'action': 'checkout',
    'membershipCardAuth': false,
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
    'privacyPolicyAgreed': 'on',
    '_csrf': document.head.querySelector('meta[name=_csrf]').content
  });
  if (data.mailmagazine === 'true') form.append({ 'subscribeToNewsletter': 'on' });
  return form;
};

export const checkoutUserInfo = async (data) => {
  const form = createForm(data);
  const res = await shamWindow.post({ url: '/p/customer-details', body: form.requestBody });
  if (!res.redirected) {
    const doc = await shamWindow.getDocumentFromResponse(res);
    return doc.body.querySelector('#fs-page-error-container').innerText.trim();
  }
  return true;
};

export const membershipRegister = async (data) => {
  const form = createForm(data);
  form.append({ 'registerAccount': 'on', 'password': data.password });
  const res = await shamWindow.post({ url: '/p/customer-details', body: form.requestBody });
  if (!res.redirected) {
    const doc = await shamWindow.getDocumentFromResponse(res);
    return doc.body.querySelector('#fs-page-error-container').innerText.trim();
  }
  return true;
};