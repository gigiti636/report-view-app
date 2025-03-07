import { AppBar, IconButton, Toolbar, Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '@/theme/context.ts';
import { routes } from '@/routes/AppRouter.tsx';
import { useReportStore } from '@/lib/reports.store.ts';

export const Header = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { reports } = useReportStore();

  return (
    <AppBar
      position="static"
      sx={{ height: '68px!important', background: (theme) => theme.palette.primary.main }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 4, flexGrow: 1, px: 2, justifyContent: 'left' }}>
          <NavLink
            to={routes.main}
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
              textDecoration: isActive ? 'underline' : 'none',
              color: 'white',
              fontSize: 'large',
            })}
          >
            Create Reports
          </NavLink>

          <NavLink
            to={routes.reports}
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
              textDecoration: isActive ? 'underline' : 'none',
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
