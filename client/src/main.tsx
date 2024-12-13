import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './AppProvider';
import NoteManagerApp from './NoteManagerApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <NoteManagerApp />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
