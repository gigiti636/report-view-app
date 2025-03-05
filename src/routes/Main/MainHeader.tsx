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
    <Box sx={{ display: 'flex' }} pt={2} pb={1} borderBottom={1} borderColor={'divider'}>
      {!hasDraft && showPrevStep && (
        <Box component={'span'} textAlign={'center'} minWidth={70}>
          <Box onClick={goPrevious} component={'span'}>
            <IconButton color={'inherit'} title={'Go to previous step'}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography color={'white'} fontSize={'small'} sx={{ cursor: 'pointer' }}>
              previous
            </Typography>
          </Box>
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
    </Box>
  );
};

export default MainHeader;
