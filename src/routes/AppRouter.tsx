import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '@/components';

import { AppLayout } from './AppLayout.tsx';
import { Main } from './Main/Main.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Main />} />
        <Route path={'/other'} element={<div> other route</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
