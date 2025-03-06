import { Box, Paper, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReportStore } from '@/lib/reports.store.ts';
import type { StoredReport } from '@/lib/types.ts';
import { useState } from 'react';
import { Modal } from '@/components';

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore();
  const [reportIdToDelete, setReportIdToDelete] = useState<string | null>(null);

  const handleDiscardReport = () => {
    if (reportIdToDelete === null) return;
    removeReport(reportIdToDelete);
    setReportIdToDelete(null);
  };

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 68px)', display: 'flex', bgcolor: 'background.default' }}>
        {/* Left Sidebar (Scrollable) */}
        <Paper
          sx={{
            width: '25%',
            height: '100%',
            overflowY: 'auto',
            p: 1,
          }}
        >
          {reports.length === 0 ? (
            <Typography variant="body1">No reports available.</Typography>
          ) : (
            <List>
              {reports.map((report: StoredReport) => (
                <ListItem
                  key={report.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => setReportIdToDelete(report.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={report.question} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

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
