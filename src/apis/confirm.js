import { checkoutUserInfo } from './userInfo';
import checkout from './checkout';

export const confirmHTML = async (data) => {
  let checkouted = await checkout(data);
  if (checkouted.hasErrors) {
    await checkoutUserInfo(data);
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
      <div style="margin-bottom:5px">
        <img src="${item.image}" style="width:40%;display:inline-block;" >
        <div style="width:57%;display:inline-block;">
          <p style="margin:0px">${item.name}</p>
          ${item.description.length > 0 ? `<p  style="margin:0px">${item.description}</p>` : ''}
          <p style="margin:0px">${item.price}円(税込)</p>
          <p style="margin:0px">数量 ${item.quantity}</p>
          <p style="margin:0px">小計 ${item.totalPrice}円</p>
        </div>
      </div>
    `).join('')}
    <h3>お支払い金額</h3>
    <dl>
      <dt style="float:left;">商品合計</dt><dd style="margin-left:100px;">${total.itemSum}円</dd>
      <dt style="float:left;">送料</dt><dd style="margin-left:100px;">${total.postage}円</dd>
      ${total.hasPaymentCharge ? `<dt style="float:left;">支払手数料</dt><dd style="margin-left:100px;">${total.paymentCharge}円</dd>` : ''}
      ${total.hasWrappingCharge ? `<dt style="float:left;">ラッピング料</dt><dd style="margin-left:100px;">${total.wrappingCharge}円</dd>` : ''}
      ${total.hasProductCoupon ? `<dt style="float:left;">クーポン値引き</dt><dd style="margin-left:100px;">-${total.productCoupon}円</dd>` : ''}
      ${total.hasPostageCoupon ? `<dt style="float:left;">クーポン送料値引き</dt><dd style="margin-left:100px;">-${total.postageCoupon}円</dd>` : ''}
      ${total.hasPointDiscount ? `<dt style="float:left;">ポイント利用</dt><dd style="margin-left:100px;">-${total.pointDiscount}円</dd>` : ''}
      <dt style="float:left;">総合計</dt><dd style="margin-left:100px;">${total.totalPrice}円</dd>
    </dl>

    <h3>お届け先</h3>
    <p style="margin:0px">${address.lastName} ${address.firstName}</p>
    <p style="margin:0px">〒${address.zipCode}</p>
    <p style="margin:0px">${address.prefecture}${address.addressLine1}${address.addressLine2}${address.addressLine3}</p>
    <h3>お支払い方法</h3>
    <p style="margin:0px">${paymentMethod}</p>
    ${coupons.length > 0 ? `
      <h3>ご利用のクーポン</h3>
      ${coupons.map(coupon => `<p style="margin:0px">${coupon}</p>`).join('')}
    ` : ''}
  `;
};