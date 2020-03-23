const script = document.createElement('script');
script.src = 'https://token.sps-system.com/sbpstoken/com_sbps_system_token.js';
document.body.appendChild(script);

export const creditCardCreateToken = async (data) => {
  const { creditCardNumber, creditCardCvc, creditCardExpiryYear, creditCardExpiryMonth } = data;
  const res = await new Promise(resolve => {
    window.com_sbps_system.generateToken({
      merchantId: '74287',
      serviceId: '212',
      ccNumber: creditCardNumber,
      ccExpiration: creditCardExpiryYear + creditCardExpiryMonth,
      securityCode: creditCardCvc
    }, resolve);
  });
  return res.tokenResponse;
};
