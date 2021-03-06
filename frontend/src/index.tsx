import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import version from './version';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Missing root element');
}

const { sentryDsn, sentryEnvironment, ...props } = root.dataset;

Sentry.init({
    dsn: sentryDsn,
    environment: sentryEnvironment,
    release: version ? `idle-rpg-clean-architecture-demo-frontend@${version}` : undefined,
});

ReactDOM.render(
    <React.StrictMode>
        <App {...props} />
    </React.StrictMode>,
    root,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
