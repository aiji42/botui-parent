import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

const ONE_DAY_MILLI_SEC = 1000 * 24 * 60 * 60;

export const findStoredValue = (propaty, udef = '') => {
  const storedData = store.get('botui-parent');
  if (!storedData) return udef;
  if (propaty in storedData) return storedData[propaty];
  return udef;
};

export const saveStoreValue = (key, value) => {
  const expiration = new Date().getTime() + ONE_DAY_MILLI_SEC;
  const storedData = store.get('botui-parent') || {};
  storedData[key] = value;
  store.set('botui-parent', storedData, expiration);
  return value;
};