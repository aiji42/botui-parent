import {
  paymentMethods,
  checkoutPaymentMethod,
  isSelectedCredit,
  checkoutCard,
  checkoutPaymentTime,
  paymentTimeChoices,
  isCouponHaving,
  checkoutAndValidateCoupon
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
  checkoutAndValidateCoupon: async (data) => await checkoutAndValidateCoupon(data)
};

export default actions;