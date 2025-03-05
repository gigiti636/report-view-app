import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface HeaderProps {
  title: string;
  showPrevStep: boolean;
  goPrevious: () => void;
  hasDraft: boolean;
}
const MainHeader = ({ title, showPrevStep, goPrevious, hasDraft }: HeaderProps) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      pt={2}
      pb={1}
      px={3}
      borderBottom={1}
      borderColor={'divider'}
      alignItems={'center'}
    >
      {!hasDraft && showPrevStep && (
        <IconButton color={'inherit'} title={'Go to previous step'} onClick={goPrevious}>
          <ArrowBackIosIcon />
        </IconButton>
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

      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} textAlign={'left'}>
        {hasDraft ? 'Edit Report' : title}
      </Typography>
    </Box>
  );
};

export default MainHeader;
