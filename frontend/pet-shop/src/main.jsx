import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global CSS that applies to everything
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';

// Step 1 & 2: Render the App
createRoot(document.getElementById('root')).render(
  // StrictMode helps find bugs in React code by rendering components twice in development mode.
  <StrictMode>
    <App />
  </StrictMode>
);
