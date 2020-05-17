import {
  paymentMethods,
  isSelectedCreditCard,
  paymentTimeChoices,
  creditToken,
  confirmHTML
} from '../apis';

const actions = {
  paymentMethods: async (data) => await paymentMethods(data),
  isSelectedCreditCard: async (data) => await isSelectedCreditCard(data),
  paymentTimeChoices: async (data) => await paymentTimeChoices(data),
  creditToken: async (data) => await creditToken(data),
  confirmHTML: async (data) => await confirmHTML(data)
};

export default actions;