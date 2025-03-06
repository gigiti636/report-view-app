import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '@/theme/context';
import { routes } from '@/routes/AppRouter.tsx';
import { useReportStore } from '@/stores/reports.store.ts';

export const Header = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { reports } = useReportStore(); // ✅ Read number of reports from Zustand

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* App Title */}
        <Typography variant="h5" component="div" textAlign={'left'}>
          Report View
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3, flexGrow: 1, px: 2, justifyContent: 'center' }}>
          <NavLink
            to={routes.main}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
              color: 'white',
              fontSize: 'large',
            })}
          >
            Home
          </NavLink>

          <NavLink
            to={routes.reports}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
              color: 'white',
              fontSize: 'large',
            })}
          >
            Reports ({reports.length})
          </NavLink>
        </Box>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} color="inherit">
          {currentTheme !== 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
