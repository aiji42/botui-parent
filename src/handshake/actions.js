import {
  paymentMethods,
  isSelectedCreditCard,
  paymentTimeChoices,
  creditToken,
  confirmHTML,
  conversion,
  isSelectableDeliveryMethod,
  deliveryMethodChoices,
  isSelectableDeliveryDateTime,
  deliveryDateChoices,
  deliveryTimeChoices
} from '../apis';

const actions = {
  paymentMethods: async (data) => await paymentMethods(data),
  isSelectedCreditCard: async (data) => await isSelectedCreditCard(data),
  paymentTimeChoices: async (data) => await paymentTimeChoices(data),
  creditToken: async (data) => await creditToken(data),
  confirmHTML: async (data) => await confirmHTML(data),
  conversion: async (data) => await conversion(data),
  isSelectableDeliveryMethod: async (data) => await isSelectableDeliveryMethod(data),
  deliveryMethodChoices: async (data) => await deliveryMethodChoices(data),
  isSelectableDeliveryDateTime: async (data) => await isSelectableDeliveryDateTime(data),
  deliveryDateChoices: async (data) => await deliveryDateChoices(data),
  deliveryTimeChoices: async (data) => await deliveryTimeChoices(data)
};

export default actions;