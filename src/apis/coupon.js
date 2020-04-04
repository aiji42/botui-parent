import { deliveryAndPaymentStep } from '../steps';
import checkout, { checkoutCoupon, checkoutCouponDelete } from './checkout';

export const isCouponHaving = async ({ couponHaving }) => couponHaving === 'true';

export const checkoutAndValidateCoupon = async (data) => {
  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await deliveryAndPaymentStep(data);
    checkouted = await checkout(data);
  }

  const { coupon } = checkouted;
  await Promise.all(coupon.coupons.map(({ id }) => checkoutCouponDelete({ couponId: id })));
  if (!(await isCouponHaving(data))) return true;
  const res = await checkoutCoupon(data);
  return !res.hasErrors;
};