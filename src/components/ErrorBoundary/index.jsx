import React from 'react';
import bugsnagClient from '../../bugsnagClient';
import bugsnagReact from '@bugsnag/plugin-react';

bugsnagClient.use(bugsnagReact, React);
const ErrorBoundary = bugsnagClient.getPlugin('react');

export default ErrorBoundary;