import { Box, Paper } from '@mui/material';
import { useReportStore } from '@/lib/reports.store.ts';
import { useState } from 'react';
import { Modal } from '@/components';
import { ReportPreview } from '@/routes/ReportsPage/ReportPreview.tsx';
import { ReportsList } from './ReportsList.tsx';
import { PromptCreateReport } from '@/routes/ReportsPage/PromptCreateReport.tsx';

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore();
  const [reportIdsToDelete, setReportIdsToDelete] = useState<string[]>([]);
  const [reportIdToView, setReportIdToView] = useState<string | null>(null);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const handleCloseReportPreview = () => {
    setReportIdToView(null);
  };

  const handleSelection = (id: string) => {
    setSelectedReports((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((reportId) => reportId !== id) : [...prevSelected, id],
    );
  };

  const handleDiscardReport = () => {
    removeReport(reportIdsToDelete);
    if (reportIdToView && reportIdsToDelete.includes(reportIdToView)) {
      setReportIdToView(null);
    }
    setSelectedReports((prevSelected) => prevSelected.filter((id) => !reportIdsToDelete.includes(id)));
    setReportIdsToDelete([]);
  };

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 68px)', display: 'flex', bgcolor: 'background.default' }}>
        {reports.length > 0 && (
          <Paper sx={{ width: '30%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ReportsList
              reportIdFocus={reportIdToView}
              reports={reports}
              selectedReports={selectedReports}
              onClearSelection={() => setSelectedReports([])}
              onSelectAll={() => setSelectedReports(reports.map((report) => report.id))}
              onSelect={handleSelection}
              onView={(_id) => (_id === reportIdToView ? setReportIdToView(null) : setReportIdToView(_id))}
              onDelete={(id) => setReportIdsToDelete([id])}
              handleDeleteSelected={() => setReportIdsToDelete(selectedReports)}
            />
          </Paper>
        )}

        <Box
          sx={{
            flex: 1,
            px: 2,
            py: 3,
            borderRadius: 2,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {reportIdToView ? (
            <ReportPreview reportIdToView={reportIdToView} handleBackButtonClick={handleCloseReportPreview} />
          ) : (
            <PromptCreateReport hasReports={reports.length > 0} handleCreated={setReportIdToView} />
          )}
        </Box>
      </Box>

      <Modal
        header={'Delete Report'}
        open={reportIdsToDelete.length > 0}
        onClose={() => setReportIdsToDelete([])}
        closeModal={() => setReportIdsToDelete([])}
        callToActionIsDelete={true}
        callToActionLabel={'Delete'}
        callToAction={handleDiscardReport}
      >
        Are you sure you want to remove these reports ({reportIdsToDelete.length})?
      </Modal>
    </>
  );
};
