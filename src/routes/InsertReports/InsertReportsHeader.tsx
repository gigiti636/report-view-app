import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface HeaderProps {
  title: string;
  showPrevStep: boolean;
  goPrevious: () => void;
}
const MainHeader = ({ title, showPrevStep, goPrevious }: HeaderProps) => {
  return (
    <Box sx={{ display: 'flex' }} pt={2} px={3} alignItems={'center'}>
      {showPrevStep && (
        <IconButton color={'inherit'} title={'Go to previous step'} onClick={goPrevious}>
          <ArrowBackIosIcon />
        </IconButton>
      )}

      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} textAlign={'center'}>
        {title}
      </Typography>
    </Box>
  );
};

export default MainHeader;
