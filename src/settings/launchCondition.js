const domainIsTrue = document.location.host === 'nelture.com';
const pathIsTrue = document.location.pathname === '/shopping/';
const referrerIsTrue = document.referrer.includes('/cart/');
const isDevelopment = process.env.NODE_ENV === 'development';

export const launchCondition = isDevelopment || domainIsTrue && pathIsTrue && referrerIsTrue;