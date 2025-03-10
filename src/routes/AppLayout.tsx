import ThemeProvider from '@/theme/ThemeProvider.tsx';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import ThemeContext from '@/theme/context.ts';
import { routes } from '@/routes/AppRouter.tsx';
import { useReportStore } from '@/lib/reports.store.ts';
import { Assessment, Dashboard } from '@mui/icons-material';

export const AppLayout = () => {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

const Header = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { reports } = useReportStore();
  const location = useLocation();

  const isPreviewDashboard = location.pathname === routes.previewDashboard;

  return (
    <AppBar
      position="static"
      sx={{ height: '68px!important', background: (theme) => theme.palette.primary.main }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Navigation Links */}
        {!isPreviewDashboard ? (
          <Box sx={{ display: 'flex', gap: 4, flexGrow: 1, px: 2, justifyContent: 'left' }}>
            <NavLink
              to={routes.reports}
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: isActive ? 'underline' : 'none',
                color: 'white',
                fontSize: 'large',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              })}
            >
              <Assessment /> Reports ({reports.length})
            </NavLink>

            <NavLink
              to={routes.dashboard}
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: isActive ? 'underline' : 'none',
                color: 'white',
                fontSize: 'large',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              })}
            >
              <Dashboard /> My Dashboard
            </NavLink>
          </Box>
        ) : (
          <Box flex={1}>
            <strong>
              <Typography variant="h6">Preview Dashboard</Typography>{' '}
            </strong>
          </Box>
        )}

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} color="inherit">
          {currentTheme !== 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
