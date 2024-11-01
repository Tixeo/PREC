import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/style.css';
import "./styles/product.css";
import "./styles/wishlist.css";
import "./styles/register.css";
import { AuthProvider } from './contexts/authContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);