import bugsnag from '@bugsnag/js';
import { serviceCode } from '../settings';

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.NODE_ENV,
  appVersion: process.env.COMMIT_REF
});
bugsnagClient.metaData = {
  serviceCode: serviceCode
};

export default bugsnagClient;