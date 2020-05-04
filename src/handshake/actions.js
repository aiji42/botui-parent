import {
  checkoutUserInfo,
  paymentMethods,
  checkoutPaymentMethod,
  isSelectedCredit,
  checkoutCard,
  checkoutPaymentTime,
  paymentTimeChoices,
  isCouponHaving,
  checkoutAndValidateCoupon,
  confirmHTML,
  membershipRegister,
  conversion
} from '../apis';

const actions = {
  checkoutUserInfo: async (data) => await checkoutUserInfo(data),
  paymentMethods: async (data) => await paymentMethods(data),
  checkoutPaymentMethod: async (data) => await checkoutPaymentMethod(data),
  isSelectedCredit: async (data) => await isSelectedCredit(data),
  checkoutCard: async (data) => await checkoutCard(data),
  checkoutPaymentTime: async (data) => await checkoutPaymentTime(data),
  paymentTimeChoices: async (data) => await paymentTimeChoices(data),
  isCouponHaving: async (data) => await isCouponHaving(data),
  checkoutAndValidateCoupon: async (data) => await checkoutAndValidateCoupon(data),
  isMembershipOptIn: async (data) => (data.membership === 'true'),
  confirmHTML: async (data) => await confirmHTML(data),
  membershipRegister: async (data) => await membershipRegister(data),
  conversion: async (data) => await conversion(data),
  redirectToConversion: async (data) => setTimeout(() => { document.location.href = data.conversion; }, '3000'),
  goToThanks: async () => setTimeout(() => { document.location.href = '/p/checkout/success'; }, '3000')
};

export default actions;