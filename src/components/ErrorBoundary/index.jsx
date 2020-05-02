import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.NODE_ENV,
  appVersion: process.env.COMMIT_REF,
  plugins: [new BugsnagPluginReact(React)],
});
Bugsnag.addMetadata('service', { code: process.env.SERVICE_CODE });
const ErrorBoundary = Bugsnag.getPlugin('react');

export default ErrorBoundary;