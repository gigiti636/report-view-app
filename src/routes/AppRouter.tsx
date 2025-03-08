import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound } from './NotFound.tsx';
import { AppLayout } from './AppLayout.tsx';
import { CreateReports } from './CreateReports/CreateReports.tsx';
import { ReportsPage } from './ReportsPage/ReportsPage.tsx';
import { Dashboard } from './Dashboard/Dashboard.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.main} element={<AppLayout />}>
        <Route index element={<CreateReports />} />
        <Route path={routes.reports} element={<ReportsPage />} />
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export const routes = {
  main: '/',
  reports: '/reports',
  dashboard: '/dashboard',
};
