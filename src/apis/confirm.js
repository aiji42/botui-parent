import { confirmStep } from '../steps';

export const confirmHTML = async (data) => {
  const step = await confirmStep(data);
  const { document: shamDocument } = step;
  const items = getItems(shamDocument);
  const total = getCartSum(shamDocument);
  const delivery = getDelivery(shamDocument);
  const payment = getPayment(shamDocument);

  return `
    <h4 style="margin:5px;">ご注文内容</h4>
    ${items.map(item => `
    <div style="margin-bottom:5px">
      <img src="${item.image}" style="width:35%;display:inline-block;vertical-align:top;" >
      <div style="width:61%;display:inline-block;vertical-align:top;">
        <p style="margin:0px">${item.name}</p>
      </div>
      <div style="display:inline-block;vertical-align:top;margin-top:3px;">
        <p style="margin:0px 10px">単価 ${item.unitPrice}</p>
        <p style="margin:0px 10px">数量 ${item.quantity}</p>
        <p style="margin:0px 10px">小計(税込) ${item.subtotal}</p>
      </div>
    </div>
    `).join('')}

    <hr size="1">
    <h4 style="margin:5px;">お支払い金額</h4>
    <dl style="margin:0px;">
      <dt style="float:left;">商品合計(税込)</dt><dd style="margin-left:110px;">${total.itemSum}</dd>
      <dt style="float:left;">決済手数料</dt><dd style="margin-left:110px;">${total.settle}</dd>
      <dt style="float:left;">送料</dt><dd style="margin-left:110px;">${total.postage}</dd>
      <dt style="float:left;"><strong>総合計</strong></dt><dd style="margin-left:110px;"><strong>${total.total}</strong></dd>
      <dt style="float:left;">獲得ポイント</dt><dd style="margin-left:110px;">${total.getPoint}</dd>
    </dl>

    <hr size="1">
    <h4 style="margin:5px;">お届け先</h4>
    <p style="margin:0px">${delivery.name}</p>
    <p style="margin:0px">${delivery.address}</p>

    <hr size="1">
    <h4 style="margin:5px;">お支払い方法</h4>
    <p style="margin:0px">${payment.payment}</p>

    <hr size="1">
    <p>
      <a href="https://www.primedirect.jp/guide/" target="_blank" >ご利用ガイド</a> 及び
      <a href="https://www.primedirect.jp/policy/" target="_blank">プライバシーポリシー</a>
      を必ず事前にお読みください。<br />ボタンを押すことで同意した事になります。
    </p>
  `;
};

const getCartLists = (confirmDocument) => Array.from(confirmDocument.body.querySelectorAll('.FS2_Cart_list li'));

const getItems = (confirmDocument) => {
  const items = getCartLists(confirmDocument).filter(item => !!item.querySelector('.FS2_Cart_Item_table'));
  return items.map(item => ({
    image: item.querySelector('.FS2_Cart_Item_Thumbnail img').src,
    name: item.querySelector('.FS2_Cart_Item_Name').innerText.trim(),
    unitPrice: item.querySelector('.FS2_Cart_Detail_PieceRate td').innerText.trim(),
    quantity: item.querySelector('.FS2_Cart_Detail_Count td').innerText.trim(),
    subtotal: item.querySelector('.FS2_Cart_Detail_Subtotal td').innerText.trim(),
  }));
};

const getCartSum = (confirmDocument) => {
  const sumTable = getCartLists(confirmDocument).find(item => !!item.querySelector('.FS2_Cart_Sum_table'));
  return {
    itemSum: sumTable.querySelector('.FS2_Cart_Sum_table td').innerText.trim(),
    settle: (sumTable.querySelector('.FS2_Cart_Detail_Settle td') && sumTable.querySelector('.FS2_Cart_Detail_Settle td').innerText.trim()) || '-',
    postage: sumTable.querySelector('.FS2_Cart_Detail_Postage td').innerText.trim(),
    total: sumTable.querySelector('.FS2_Cart_Detail_InclusiveSum td').innerText.trim(),
    getPoint: sumTable.querySelector('.FS2_Cart_Detail_GetPoint td').innerText.trim()
  };
};

const getDelivery = (confirmDocument) => {
  const [name, address, delivery] = Array.from(confirmDocument.body.querySelectorAll('.FS2_OrderConfirm_Delivery_table td'));
  return {
    name: name.innerText.trim(),
    address: address.innerText.trim().replace(/〒\d{3}-\d{4}\s/, (match) => `${match}<br />`).replace(/TEL/, '<br />TEL'),
    delivery: delivery.innerText.trim()
  };

};

const getPayment = (confirmDocument) => {
  const paymentArea = Array.from(confirmDocument.body.querySelectorAll('.FS2_OrderConfirm_list li')).find(el => el.innerText.includes('お支払い方法'));
  return {
    payment: paymentArea.querySelector('p').innerText.trim()
  };
};