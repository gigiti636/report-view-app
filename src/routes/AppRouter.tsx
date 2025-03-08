import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from './AppLayout.tsx';
import { NotFound } from './NotFound.tsx';
import { InsertReports } from './InsertReports/InsertReports.tsx';
import { ReportsPage } from './ReportsPage/ReportsPage.tsx';
import { MyDashboard } from './MyDashboard/MyDashboard.tsx';
import { PreviewDashboard } from './PreviewDashboard/PreviewDashboard.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.main} element={<AppLayout />}>
        <Route index path={routes.reports} element={<ReportsPage />} />
        <Route path={routes.insertReports} element={<InsertReports />} />
        <Route path={routes.dashboard} element={<MyDashboard />} />
        <Route path={routes.previewDashboard} element={<PreviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export const routes = {
  main: '/',
  reports: '/',
  insertReports: '/insert-reports',
  dashboard: '/dashboard',
  previewDashboard: '/preview-dashboard',
};
