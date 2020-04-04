import { deliveryAndPaymentStep } from '../steps';
import checkout from './checkout';

export const confirmHTML = async (data) => {
  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await deliveryAndPaymentStep(data);
    checkouted = await checkout(data);
  }

  const { cart, delivery, payment, coupon, totals } = checkouted;
  const items = cart.lines.map(({ productName, thumbnail, variationAttributes, priceWithOptions, quantity, total }) => ({
    name: productName,
    description: variationAttributes.map(({ valueName }) => valueName).join('/'),
    image: thumbnail.url,
    price: priceWithOptions.withTax,
    quantity,
    totalPrice: total.amount
  }));
  const address = delivery.shipment.shippingAddress;
  const paymentMethod = payment.paymentMethods.find(method => method.selected).displayName;
  const coupons = coupon.coupons.filter(({ using }) => using).map(({ name }) => name);
  const total = {
    itemSum: totals.itemSum,
    postage: totals.postageTotal,
    hasPaymentCharge: totals.hasPaymentCharge,
    paymentCharge: totals.paymentCharge,
    hasWrappingCharge: totals.hasWrappingCharge,
    wrappingCharge: totals.wrappingCharge,
    hasProductCoupon: totals.hasProductCouponDiscount,
    productCoupon: totals.productCouponDiscount,
    hasPostageCoupon: totals.hasPostageCouponDiscount,
    postageCoupon: totals.postageCouponDiscount,
    hasPointDiscount: totals.hasPointDiscount,
    pointDiscount: totals.pointDiscount,
    totalPrice: totals.grandTotal.amount,
  };

  return `
    <h3>ご注文内容</h3>
    ${items.map(item => `
      <img src="${item.image}">
      <p>${item.name}</p>
      ${item.description.length > 0 ? `<p>${item.description}</p>` : ''}
      <p>${item.price}円(税込)</p>
      <p>数量 ${item.quantity}</p>
      <p>小計 ${item.totalPrice}円</p>
    `).join('')}
    <h3>お支払い金額</h3>
    <p>商品合計 ${total.itemSum}円</p>
    <p>送料 ${total.postage}円</p>
    ${total.hasPaymentCharge ? `<p>支払手数料 ${total.paymentCharge}円</p>` : ''}
    ${total.hasWrappingCharge ? `<p>ラッピング料 ${total.wrappingCharge}円</p>` : ''}
    ${total.hasProductCoupon ? `<p>クーポン値引き -${total.productCoupon}円</p>` : ''}
    ${total.hasPostageCoupon ? `<p>クーポン送料値引き -${total.postageCoupon}円</p>` : ''}
    ${total.hasPointDiscount ? `<p>ポイント利用 -${total.pointDiscount}円</p>` : ''}
    <p>総合計 ${total.totalPrice}円</p>
    <h3>お届け先</h3>
    <p>${address.lastName} ${address.firstName}</p>
    <p>〒${address.zipCode}</p>
    <p>${address.prefecture}${address.addressLine1}${address.addressLine2}${address.addressLine3}</p>
    <h3>お支払い方法</h3>
    <p>${paymentMethod}</p>
    ${coupons.length > 0 ? `
      <h3>ご利用のクーポン</h3>
      ${coupons.map(coupon => `<p>${coupon}</p>`).join('')}
    ` : ''}
  `;
};