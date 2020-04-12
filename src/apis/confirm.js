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

  return makeHTML({ data, items, total, address, paymentMethod, coupons });
};

const makeHTML = ({ data, items, total, address, paymentMethod, coupons }) => `
  <h4 style="margin:5px;">ご注文内容</h4>
  ${items.map(item => `
    <div style="margin-bottom:5px">
      <img src="${item.image}" style="width:35%;display:inline-block;vertical-align:top;" >
      <div style="width:63%;display:inline-block;vertical-align:top;">
        <p style="margin:0px">${item.name}</p>
        ${item.description.length > 0 ? `<p  style="margin:0px">${item.description}</p>` : ''}
        <p style="margin:0px">${item.price}円(税込)</p>
        <p style="margin:0px">数量 ${item.quantity}</p>
        <p style="margin:0px">小計 ${item.totalPrice}円</p>
      </div>
    </div>
  `).join('')}

  <hr size="1">
  <h4 style="margin:5px;">お支払い金額</h4>
  <dl style="margin:0px;">
    <dt style="float:left;">商品合計</dt><dd style="margin-left:110px;">${total.itemSum}円</dd>
    <dt style="float:left;">送料</dt><dd style="margin-left:110px;">${total.postage}円</dd>
    ${total.hasPaymentCharge ? `<dt style="float:left;">支払手数料</dt><dd style="margin-left:110px;">${total.paymentCharge}円</dd>` : ''}
    ${total.hasWrappingCharge ? `<dt style="float:left;">ラッピング料</dt><dd style="margin-left:110px;">${total.wrappingCharge}円</dd>` : ''}
    ${total.hasProductCoupon ? `<dt style="float:left;">クーポン値引き</dt><dd style="margin-left:110px;">-${total.productCoupon}円</dd>` : ''}
    ${total.hasPostageCoupon ? `<dt style="float:left;">クーポン送料値引き</dt><dd style="margin-left:110px;">-${total.postageCoupon}円</dd>` : ''}
    ${total.hasPointDiscount ? `<dt style="float:left;">ポイント利用</dt><dd style="margin-left:110px;">-${total.pointDiscount}円</dd>` : ''}
    <dt style="float:left;"><strong>総合計</strong></dt><dd style="margin-left:110px;"><strong>${total.totalPrice}円</strong></dd>
  </dl>

  <hr size="1">
  <h4 style="margin:5px;">お届け先</h4>
  <p style="margin:0px">${address.lastName} ${address.firstName}</p>
  <p style="margin:0px">〒${address.zipCode}</p>
  <p style="margin:0px">${address.prefecture}${address.addressLine1}${address.addressLine2}${address.addressLine3}</p>

  <hr size="1">
  <h4 style="margin:5px;">お支払い方法</h4>
  <p style="margin:0px">${paymentMethod}</p>
  ${coupons.length > 0 ? `
    <hr size="1">
    <h4 style="margin:5px;">ご利用のクーポン</h4>
    ${coupons.map(coupon => `<p style="margin:0px">${coupon}</p>`).join('')}
  ` : ''}

  <hr size="1">
  <p>
    ${data.membership === 'true' ? '<a href="https://www.amepla.jp/p/about/member-agreement" target="_blank" >会員利用規約</a> 及び' : ''}
    <a href="https://www.amepla.jp/p/about/privacy-policy" target="_blank">個人情報保護方針</a>
    を必ずお読みください。<br />ボタンを押すことで同意した事になります。
  </p>
`;