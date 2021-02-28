import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import {
  AppProvider,
  AuthProvider,
  GQLProvider,
  ThemeProvider,
} from './contexts';
import { App } from './components';
import * as serviceWorker from './serviceWorker';

const { REACT_APP_SENTRY_ENVIRONMENT } = process.env;

Sentry.init({
  dsn:
    'https://4e3056f36fec46b18ec8c6a8506f398e@o484052.ingest.sentry.io/5536817',
  environment: REACT_APP_SENTRY_ENVIRONMENT,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1,
});

ReactDOM.render(
  <React.StrictMode>
    <GQLProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </GQLProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
