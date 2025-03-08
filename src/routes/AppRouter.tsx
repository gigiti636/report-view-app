import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from './AppLayout.tsx';
import { NotFound } from './NotFound.tsx';
import { CreateReports } from './CreateReports/CreateReports.tsx';
import { ReportsPage } from './ReportsPage/ReportsPage.tsx';
import { MyDashboard } from './MyDashboard/MyDashboard.tsx';
import { PreviewDashboard } from './PreviewDashboard/PreviewDashboard.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.main} element={<AppLayout />}>
        <Route index element={<CreateReports />} />
        <Route path={routes.reports} element={<ReportsPage />} />
        <Route path={routes.dashboard} element={<MyDashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path={routes.previewDashboard} element={<PreviewDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export const routes = {
  main: '/',
  reports: '/reports',
  dashboard: '/dashboard',
  previewDashboard: '/preview-dashboard',
};
