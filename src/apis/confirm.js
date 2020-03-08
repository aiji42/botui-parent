import { confirmStep } from '../steps';

const reflexiveSplice = (item, count, base = []) => {
  const cloneItem = [...item];
  base.push(cloneItem.splice(0, count));
  return cloneItem.length < 1 ? base : reflexiveSplice(cloneItem, count, base);
};

const subdivideInnerText = (target) => target.innerText.split(/\n/).map((str) => str.trim()).filter(Boolean);

export const confirm = async (data) => {
  const step = await confirmStep(data);

  const items = reflexiveSplice(subdivideInnerText(step.document.querySelector('.cart-list')), 3);
  const images = Array.from(step.document.querySelector('.cart-list').querySelectorAll('img')).map((img) => img.src);
  items.forEach((item) => item.unshift(images.shift()));

  const deliveryTmp = subdivideInnerText(
    Array.from(step.document.querySelectorAll('#detail_order h3'))
      .find((el) => el.innerText === 'お届け先住所').nextElementSibling,
  );
  const delivery = [deliveryTmp.splice(0, 1), deliveryTmp.splice(-2, 2)];
  delivery.splice(1, 0, deliveryTmp);

  const pay = reflexiveSplice(subdivideInnerText(step.document.querySelector('.detail_pay')), 2);

  const supplement = `
    <a href="https://nelture.com/entry/kiyaku.php" target="_blank">ご利用規約</a>と
    <a href="https://nelture.com/guide/privacy.php" target="_blank">プライバシーポリシー</a>
    を必ずお読みください。<br />ボタンを押すことで利用規約に同意した事になります。
  `;

  return { items, delivery, pay, supplement };
};
