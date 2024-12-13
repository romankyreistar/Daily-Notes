import React, { useContext } from 'react';
import { AppContext } from './AppProvider';
import { AuthProvider } from './auth/provider';
import { AppRouter } from './router/AppRouter';
import { NoteModal } from './components';

const NoteManagerApp: React.FC = () => {
  const { theme } = useContext(AppContext);

  return (
    <AuthProvider>
      <main className='main-container' data-theme={theme}>
        <AppRouter />
        <NoteModal />
      </main>
    </AuthProvider>
  );
};

export default NoteManagerApp;
