import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from '@/theme/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
