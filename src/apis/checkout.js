import { creditCardCreateToken } from './creditCard';

const checkout = async () => {
  const res = await fetch('/api/checkout');
  const json = JSON.parse(await res.text());
  return json;
};

export default checkout;

export const checkoutPaymentMethod = async ({ payment: paymentMethod }) => {
  const res = await fetch('/api/checkout/payment', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-xsrf-token': document.head.querySelector('meta[name=_csrf]').content
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ paymentMethod })
 });
  const json = JSON.parse(await res.text());
  return json;
};

export const checkoutCard = async (data) => {
  const { token, tokenKey, maskedCcNumber: number } = await creditCardCreateToken(data);
  const res = await fetch('/api/checkout/card', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-xsrf-token': document.head.querySelector('meta[name=_csrf]').content
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({token, tokenKey, number})
  });
  const json = JSON.parse(await res.text());
  return json;
};

export const checkoutPaymentTime = async ({ payment: paymentMethod, paymentTime: paymentType }) => {
  const res = await fetch('/api/checkout/payment', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-xsrf-token': document.head.querySelector('meta[name=_csrf]').content
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ paymentMethod, paymentType })
  });
  const json = JSON.parse(await res.text());
  return json;
};

export const checkoutCoupon = async ({ coupon: couponCode }) => {
  const res = await fetch('/api/checkout/coupon-code', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-xsrf-token': document.head.querySelector('meta[name=_csrf]').content
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ couponCode })
  });
  const json = JSON.parse(await res.text());
  return json;
};

export const checkoutCouponDelete = async ({ couponId }) => {
  const res = await fetch(`/api/checkout/coupons/${couponId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-xsrf-token': document.head.querySelector('meta[name=_csrf]').content
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({})
  });
  const json = JSON.parse(await res.text());
  return json;
};