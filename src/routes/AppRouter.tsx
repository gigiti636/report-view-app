import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '@/components';

import { AppLayout } from './AppLayout.tsx';
import { Main } from './Main/Main.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.main} element={<AppLayout />}>
        <Route index element={<Main />} />
        <Route path={routes.reports} element={<div>Reports page</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export const routes = {
  main: '/',
  reports: '/reports',
};
