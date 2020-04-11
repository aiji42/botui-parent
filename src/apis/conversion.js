import checkout, { checkoutOrder } from './checkout';

export const conversion = async (data) => {
  await checkout(data);
  const { redirectUrl, hasErrors } = await checkoutOrder();
  if (!hasErrors && !redirectUrl) return true;

  return redirectUrl;
};