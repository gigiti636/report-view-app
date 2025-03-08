import { Box, Paper } from '@mui/material';
import { useReportStore } from '@/lib/reports.store.ts';
import { useState } from 'react';
import { Modal } from '@/components';
import { ReportPreview } from '@/routes/ReportsPage/ReportPreview.tsx';
import { ReportsList } from './ReportsList.tsx';
import { DashBoardWidget } from '@/lib/types.ts';
import { DashBoardPrompt } from '@/routes/ReportsPage/DashboardPrompt.tsx';
import { DashBoardGridArea } from './DashBoardGridArea.tsx'; // Import the new component

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore();
  const [reportIdsToDelete, setReportIdsToDelete] = useState<string[]>([]);
  const [reportIdToView, setReportIdToView] = useState<string | null>(null);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const [dashboardReports, setDashboardReports] = useState<DashBoardWidget[]>([]);

  const handleUpdateDashboardWidget = (id: string, updatedItem: Partial<DashBoardWidget>) => {
    setDashboardReports((prev) =>
      prev.map((widget) => (widget.id === id ? { ...widget, ...updatedItem } : widget)),
    );
  };

  const handleSelection = (id: string) => {
    setSelectedReports((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((reportId) => reportId !== id) : [...prevSelected, id],
    );
  };

  const handleDiscardReport = () => {
    removeReport(reportIdsToDelete);
    setSelectedReports((prevSelected) => prevSelected.filter((id) => !reportIdsToDelete.includes(id)));
    setReportIdsToDelete([]);
  };

  const handleSentToDashboard = () => {
    const reportToAddToDashboard = reports.filter((report) => selectedReports.includes(report.id));
    setDashboardReports(reportToAddToDashboard.map((rep, index) => ({ ...rep, cols: 6, order: index + 1 })));
    setSelectedReports([]);
  };

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 68px)', display: 'flex', bgcolor: 'background.default' }}>
        {dashboardReports.length === 0 && (
          <Paper sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          {dashboardReports.length > 0 && (
            <DashBoardGridArea
              dashboardReports={dashboardReports}
              handleBackToReports={() => setDashboardReports([])}
              handleUpdateDashboardWidget={handleUpdateDashboardWidget}
            />
          )}

          {dashboardReports.length === 0 && reportIdToView && (
            <ReportPreview reportIdToView={reportIdToView} />
          )}

          {dashboardReports.length === 0 && !reportIdToView && (
            <DashBoardPrompt hasReports={reports.length > 0} />
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
