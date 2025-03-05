import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import ThemeContext from '@/theme/context';

export const Header = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex' }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} textAlign={'left'}>
          Report View App
        </Typography>

        <IconButton onClick={toggleTheme} color={'inherit'} sx={{ pY: 70 }}>
          {currentTheme !== 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
