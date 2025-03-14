import { useReportStore } from '@/lib/reports.store.ts';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Dashboard, Modal } from '@/components';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useRef, useState } from 'react';
import { encodeData } from '@/lib/utils.ts';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { usePDF } from 'react-to-pdf';

export const MyDashboard = () => {
  const { clearDashboard, dashboard, updateDashboard } = useReportStore();

  const [showDeleteDashboard, setShowDeleteDashboard] = useState(false);
  const [showShareModal, setShowShareDashboard] = useState(false);
  const textAreaRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false); // New state for loading

  const { toPDF, targetRef } = usePDF({ filename: 'reports-export.pdf' });

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
    const encodedDashboard = encodeData(JSON.stringify(dashboard));
    const encodedTitle = encodeData(textAreaRef.current?.['value'] || '');
    const shareUrl = `${window.location.origin}/preview-dashboard?data=${encodedDashboard}&title=${encodedTitle}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => console.log('Dashboard link copied successfully!'))
      .catch((err) => console.error('Failed to copy link:', err));
    setShowShareDashboard(false);
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true); // Start loading
    toPDF();
    setIsGeneratingPDF(false); // Stop loading
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
          {!isEdit && (
            <>
              <Button variant={'outlined'} color={'error'} onClick={() => setShowDeleteDashboard(true)}>
                Delete Dashboard
              </Button>
              <Button
                variant={'outlined'}
                color={'warning'}
                onClick={generatePDF}
                disabled={isGeneratingPDF} // Disable button while loading
              >
                {isGeneratingPDF ? <CircularProgress size={20} color="inherit" /> : 'Download PDF'}
              </Button>
              <Button variant={'outlined'} color={'info'} onClick={handleShareButtonClick}>
                Share Dashboard
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsEdit(true)}
                sx={{ display: 'flex', gap: '8px' }}
              >
                <AspectRatioIcon />
                Layout unlock
              </Button>
            </>
          )}

          {isEdit && (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => setIsEdit(false)}
              sx={{ display: 'flex', gap: '8px' }}
            >
              <AspectRatioIcon />
              Lock layout
            </Button>
          )}
        </Box>

        <div ref={targetRef}>
          <Box bgcolor={'background.default'}>
            <Dashboard
              dashboard={dashboard}
              isEdit={isEdit}
              onNewLayout={(layout) => updateDashboard({ layout })}
            />
          </Box>
        </div>
      </Box>
    </>
  );
};
