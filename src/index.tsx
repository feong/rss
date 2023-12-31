import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import GlobalSettingsProvider from './providers/GlobalSettingsProvider';
import ReadingStatusProvider from './providers/ReadingStatusProvider';
import SourcesProvider from './providers/SourcesProvider';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalSettingsProvider>
      <SourcesProvider>
        <ReadingStatusProvider>
          <App />
        </ReadingStatusProvider>
      </SourcesProvider>
    </GlobalSettingsProvider>
  </React.StrictMode>,
);

// document.body.addEventListener(
//   'touchmove',
//   function (event: any) {
//     if (event._isScroller) return;
//     event.preventDefault();
//   },
//   { passive: false },
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
