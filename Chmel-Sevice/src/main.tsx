import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/styles/index.css';

async function enableMocking() {
  // Enable MSW worker in browser
  const { worker } = await import('./shared/api/mock/browser');
  
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
