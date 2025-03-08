import { useReportStore } from '@/lib/reports.store.ts';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Dashboard, Modal } from '@/components';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useRef, useState } from 'react';

export const MyDashboard = () => {
  const { clearDashboard, dashboard } = useReportStore();

  const [showDeleteDashboard, setShowDeleteDashboard] = useState(false);
  const [showShareModal, setShowShareDashboard] = useState(false);
  const textAreaRef = useRef(null);

  if (!dashboard) {
    return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={10}>
        No dashboard found
      </Box>
    );
  }

  const handleShareButtonClick = () => {
    setShowShareDashboard(true);
  };

  const shareDashboard = () => {
    const encodedDashboard = encodeURIComponent(JSON.stringify(dashboard));
    const shareUrl = `${window.location.origin}/preview-dashboard?data=${encodedDashboard}&title=${textAreaRef.current?.['value']}`;
    navigator.clipboard.writeText(shareUrl);
    setShowShareDashboard(false);
  };

  return (
    <>
      <Modal
        header={'Are you sure you want to delete dashboard ?'}
        open={showDeleteDashboard}
        onClose={() => setShowDeleteDashboard(false)}
        closeModal={() => setShowDeleteDashboard(false)}
        callToActionIsDelete={true}
        callToActionLabel={'Delete'}
        callToAction={clearDashboard}
      >
        Are you sure you want to disregard this report from reports?
      </Modal>

      <Modal
        header={'Share dashboard'}
        open={showShareModal}
        onClose={() => setShowShareDashboard(false)}
        closeModal={() => setShowShareDashboard(false)}
        callToActionLabel={'Copy and close modal'}
        callToAction={shareDashboard}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            letterSpacing: 1.2,
            mb: 3,
            mt: 5,
          }}
        >
          Would you like to add a preview title ?
        </Typography>
        <TextField fullWidth minRows={3} inputRef={textAreaRef} placeholder={'Optional'} />
      </Modal>

      <Box>
        <Box mt={2} mx={2} display={'flex'} justifyContent={'end'} gap={2}>
          <Button variant={'outlined'} color={'error'} onClick={() => setShowDeleteDashboard(true)}>
            Delete Dashboard
          </Button>
          <Button variant={'contained'} color={'info'} onClick={handleShareButtonClick}>
            Share Dashboard
          </Button>
        </Box>
        <Dashboard dashboard={dashboard} />
      </Box>
    </>
  );
};
