import { Box, Paper } from '@mui/material';
import { useReportStore } from '@/lib/reports.store.ts';
import { useState } from 'react';
import { Modal } from '@/components';
import { ReportPreviewModal } from '@/routes/ReportsPage/ReportPreviewModal.tsx';
import { ReportsList } from './ReportsList.tsx';
import { DashBoardPrompt } from '@/routes/ReportsPage/DashboardPrompt.tsx';

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore();
  const [reportIdsToDelete, setReportIdsToDelete] = useState<string[]>([]);
  const [reportIdToView, setReportIdToView] = useState<string | null>(null);

  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const handleSelection = (id: string) => {
    setSelectedReports(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((reportId) => reportId !== id) // Deselect
          : [...prevSelected, id], // Select
    );
  };

  const handleDiscardReport = () => {
    removeReport(reportIdsToDelete);

    setSelectedReports((prevSelected) => prevSelected.filter((id) => !reportIdsToDelete.includes(id)));

    setReportIdsToDelete([]);
  };

  const handleSentToDashboard = () => {
    alert(selectedReports);
  };

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 68px)', display: 'flex', bgcolor: 'background.default' }}>
        <ReportsList
          reports={reports}
          selectedReports={selectedReports}
          onClearSelection={() => setSelectedReports([])}
          onSelectAll={() => setSelectedReports(reports.map((report) => report.id))}
          onSelect={handleSelection}
          onView={setReportIdToView}
          onDelete={(id) => setReportIdsToDelete([id])}
          handleDeleteSelected={() => setReportIdsToDelete(selectedReports)}
          handleSentToDashboard={handleSentToDashboard}
        />

        {/* Right Main Content (Dashboard) */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            py: 3 / 2,
            borderRadius: 2,
            background: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <DashBoardPrompt hasReports={reports.length > 0} />
          </Paper>
        </Box>
      </Box>

      <ReportPreviewModal reportIdToView={reportIdToView} onClose={() => setReportIdToView(null)} />

      <Modal
        header={'Delete Report'}
        open={reportIdsToDelete.length > 0}
        onClose={() => setReportIdsToDelete([])}
        closeModal={() => setReportIdsToDelete([])}
        callToActionIsDelete={true}
        callToActionLabel={'Delete'}
        callToAction={handleDiscardReport}
      >
        Are you sure you want to remove this reports({reportIdsToDelete.length})?
      </Modal>
    </>
  );
};
