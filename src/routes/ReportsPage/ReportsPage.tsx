import { Box, Paper, Typography } from '@mui/material';
import { useReportStore } from '@/lib/reports.store.ts';
import { useState } from 'react';
import { Modal } from '@/components';
import { ReportPreviewModal } from '@/routes/ReportsPage/ReportPreviewModal.tsx';
import { ReportsList } from './ReportsList.tsx';

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore();
  const [reportIdToDelete, setReportIdToDelete] = useState<string | null>(null);
  const [reportIdToView, setReportIdToView] = useState<string | null>(null);

  const handleDiscardReport = () => {
    if (reportIdToDelete === null) return;
    removeReport(reportIdToDelete);
    setReportIdToDelete(null);
  };

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 68px)', display: 'flex', bgcolor: 'background.default' }}>
        <ReportsList reports={reports} onView={setReportIdToView} onDelete={setReportIdToDelete} />

        {/* Right Main Content (Dashboard) */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            background: 'background.default',
          }}
        >
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h5">Main Content</Typography>
            <Typography>This section remains static while the left sidebar scrolls.</Typography>
          </Paper>
        </Box>
      </Box>

      <ReportPreviewModal reportIdToView={reportIdToView} onClose={() => setReportIdToView(null)} />

      <Modal
        header={'Delete Report'}
        open={Boolean(reportIdToDelete)}
        onClose={() => setReportIdToDelete(null)}
        closeModal={() => setReportIdToDelete(null)}
        callToActionIsDelete={true}
        callToActionLabel={'Delete'}
        callToAction={handleDiscardReport}
      >
        Are you sure you want to remove this report?
      </Modal>
    </>
  );
};
