import bugsnagClient from './bugsnagClient';

const errorHandler = (e) => {
  if (process.env.NODE_ENV === 'development') console.error(e);
  bugsnagClient.notify(e);
};

export default errorHandler;