import ThemeProvider from '@/theme/ThemeProvider.tsx';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

export const AppLayout = () => {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};
