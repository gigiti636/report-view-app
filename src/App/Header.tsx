import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import ThemeContext from '@/theme/context';

interface HeaderProps {
  title: string;
  showPrevStep: boolean;
  goPrevious: () => void;
  hasDraft: boolean;
}
const Header = ({ title, showPrevStep, goPrevious, hasDraft }: HeaderProps) => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex' }}>
        {!hasDraft && (
          <Box component={'span'} textAlign={'center'} minWidth={70}>
            {showPrevStep && (
              <Box onClick={goPrevious} component={'span'}>
                <IconButton color={'inherit'} title={'Go to previous step'}>
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography color={'white'} fontSize={'small'} sx={{ cursor: 'pointer' }}>
                  previous
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {hasDraft && (
          <Button
            variant={'outlined'}
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Clear
          </Button>
        )}

        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} textAlign={'center'}>
          {hasDraft ? 'Edit Report' : title}
        </Typography>

        <IconButton onClick={toggleTheme} color={'inherit'} sx={{ pY: 70 }}>
          {currentTheme !== 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
