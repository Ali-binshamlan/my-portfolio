import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // أضف هذا
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* لف التطبيق بالراوتر هنا */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
