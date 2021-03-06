import {
  isSelectableDeriveryDateTime,
  paymentMethods,
  deliveryDateChoices,
  deliveryTimeChoices,
  confirm,
  conversionPrepare,
  conversion,
  shouldGoPaymentPage
} from '../apis';

const actions = {
  isSelectableDeriveryDateTime: async (data) => await isSelectableDeriveryDateTime(data),
  paymentMethods: async (data) => await paymentMethods(data),
  deliveryDateChoices: async (data) => await deliveryDateChoices(data),
  deliveryTimeChoices: async (data) => await deliveryTimeChoices(data),
  confirm: async (data) => await confirm(data),
  conversionPrepare: async (data) => await conversionPrepare(data),
  conversion: async (data) => await conversion(data),
  shouldGoPaymentPage: async (data) => await shouldGoPaymentPage(data)
};

export default actions;