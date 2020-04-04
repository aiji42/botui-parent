import checkout, { checkoutCoupon, checkoutCouponDelete } from './checkout';

export const isCouponHaving = async ({ couponHaving }) => couponHaving === 'true';

export const checkoutAndValidateCoupon = async (data) => {
  const { coupon } = await checkout();
  await Promise.all(coupon.coupons.map(({ id }) => checkoutCouponDelete({ couponId: id })));
  if (!(await isCouponHaving(data))) return true;
  const res = await checkoutCoupon(data);
  return !res.hasErrors;
};