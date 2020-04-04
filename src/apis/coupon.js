import { checkoutCoupon } from './checkout'

export const isCouponHaving = async ({ couponHaving }) => couponHaving === 'yes'

export const checkoutAndValidateCoupon = async (data) => {
  const res = await checkoutCoupon(data)
  return !res.hasErrors
}