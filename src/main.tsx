import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Suppress ResizeObserver errors
const resizeObserverErrRe = /^[a-zA-Z0-9\s]*ResizeObserver loop completed with undelivered notifications/;
window.addEventListener('error', (e) => {
  if (e.message && (resizeObserverErrRe.test(e.message) || e.message.includes("ResizeObserver loop limit exceeded") || e.message.includes("ResizeObserver loop completed with undelivered notifications"))) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

window.onerror = function(message, source, lineno, colno, error) {
  if (typeof message === 'string' && (message.includes('ResizeObserver loop limit exceeded') || message.includes('ResizeObserver loop completed with undelivered notifications'))) {
    return true; // Prevents the firing of the default event handler
  }
  return false;
};

const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && (args[0].includes('ResizeObserver loop limit exceeded') || args[0].includes('ResizeObserver loop completed with undelivered notifications'))) {
    return;
  }
  originalConsoleError(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
