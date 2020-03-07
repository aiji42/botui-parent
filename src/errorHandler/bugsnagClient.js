import bugsnag from '@bugsnag/js';
const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.NODE_ENV
});

export default bugsnagClient;