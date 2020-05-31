import { getSettleEditStep } from '../steps';

export const isUseablePoints = async () => !!(await getSettleEditStep()).document.querySelector('input[name=pointSelect]');

export const pointUseageChoices = async () => {
  if (!(await isUseablePoints())) return {};
  return Array.from((await getSettleEditStep()).document.querySelectorAll('input[name=pointSelect]'))
    .reduce((res, input) => ({ ...res, [input.value]: input.nextSibling.textContent.trim()}), {});
};

export const isInputablePoints = async (data) => (await pointUseageChoices())[data.pointSelect] === '一部ポイントを利用する';

const getUseablePoints = async () => {
  const text = (await getSettleEditStep()).document.querySelector('.FS2_SettleEdit_Point_container').innerText;
  return text.match(/\d+ポイント/g).reduce((res, point) => +point.replace('ポイント', '') + res, 0);
};

export const pointUseableValidate = async (data) => +data.usePoint <= await getUseablePoints();

export const pointAnnounce = async () => Array.from((await getSettleEditStep()).document.querySelector('.FS2_SettleEdit_Point_container').childNodes)
  .filter(({ nodeName }) => nodeName === '#text')
  .map(({ nodeValue }) => nodeValue).join('');