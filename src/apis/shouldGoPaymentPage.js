import { paymentMethods } from './deliveryAndPayment'

export const shouldGoPaymentPage = async (data) => {
  const { payment } = data
  return (await paymentMethods(data))[payment] !== '代金引換'
}