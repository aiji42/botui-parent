import bugsnagClient from './bugsnagClient';

const errorHandler = (e) => {
  if (process.env.NODE_ENV === 'development') console.error(e);
  bugsnagClient.notify(e);
};

const errorBoundary = async (func) => {
  try {
    await func();
  } catch (e) {
    errorHandler(e);
  }
};

export default errorBoundary;