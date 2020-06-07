import DeviceDetector from 'device-detector-js';

const conditions = JSON.parse(process.env.BOTUI_LAUNCH_CONDITION || '{}');

const hostCheck = (conditions) => {
  const checker = (condition) => document.location.host.includes(condition);
  if (conditions instanceof Array) return conditions.some(checker);
  else return checker(conditions);
};

const pathnameCheck = (conditions) => {
  const checker = (condition) => document.location.pathname.includes(condition);
  if (conditions instanceof Array) return conditions.some(checker);
  else return checker(conditions);
};

const searchCheck = (conditions) => {
  const checker = (condition) => document.location.search.includes(condition);
  if (conditions instanceof Array) return conditions.some(checker);
  else return checker(conditions);
};

const referrerCheck = (conditions) => {
  const checker = (condition) => document.referrer.includes(condition);
  if (conditions instanceof Array) return conditions.some(checker);
  else return checker(conditions);
};

const deviceCheck = (conditions) => {
  const deviceDetector = new DeviceDetector();
  const { device } = deviceDetector.parse(window.navigator.userAgent);
  if (!device) return false;

  const checker = (condition) => device.type === condition;

  if (conditions instanceof Array) return conditions.some(checker);
  else return checker(conditions);
};

export const launchCondition = Object.keys(conditions).every(key => {
  if (key === 'host') return hostCheck(conditions[key]);
  if (key === 'pathname') return pathnameCheck(conditions[key]);
  if (key === 'search') return searchCheck(conditions[key]);
  if (key === 'referrer') return referrerCheck(conditions[key]);
  if (key === 'device') return deviceCheck(conditions[key]);
});