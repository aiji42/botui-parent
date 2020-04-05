import {
  paymentMethods,
  checkoutPaymentMethod,
  isSelectedCredit,
  checkoutCard,
  checkoutPaymentTime,
  paymentTimeChoices,
  isCouponHaving,
  checkoutAndValidateCoupon,
  confirmHTML,
  conversion
} from '../apis';
import { dataLayerBotui } from '../gtm';

const actions = {
  dataLayerPush: async (data) => dataLayerBotui.push(data),
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
  conversion: async () => await conversion(),
  goToThanks: async () => setTimeout(() => { document.location.href = '/p/checkout/success'; }, '3000')
};

export default actions;