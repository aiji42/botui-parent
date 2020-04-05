import { checkoutOrder } from './checkout';

export const conversion = async () => {
  const { redirectUrl, hasErrors } = await checkoutOrder();
  if (!hasErrors && !redirectUrl) return true;

  return false;
  // const iframe = document.createElement('iframe')
  // iframe.src = redirectUrl
  // document.body.appendChild(iframe)
  // iframe.contentWindow.document.body.querySelector('main #fs-page-error-container').innerText
};