import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './themes/global.theme.ts';
import { Provider } from 'react-redux';
import store from './store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './translations/i18n.ts';
import '@xyflow/react/dist/style.css'; // Add here for global use

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
  >
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
