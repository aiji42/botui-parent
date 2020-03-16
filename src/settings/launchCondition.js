const domainIsTrue = document.location.host === 'nelture.com';
const pathIsTrue = document.location.pathname === '/shopping/';
const referrerIsTrue = document.referrer.includes('/cart/');

export const launchCondition = domainIsTrue && pathIsTrue && referrerIsTrue;