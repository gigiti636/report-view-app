import { Box, Paper } from '@mui/material';
import { useReportStore } from '@/lib/reports.store.ts';
import { useRef, useState } from 'react';
import { Modal } from '@/components';
import { ReportPreview } from '@/routes/ReportsPage/ReportPreview.tsx';
import { ReportsList } from './ReportsList.tsx';
import { StoredReport } from '@/lib/types.ts';
import { DashBoardPrompt } from '@/routes/ReportsPage/DashboardPrompt.tsx';
import { DashBoardGrid } from './DashBoardGrid.tsx'; // Import the new component

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore();
  const [reportIdsToDelete, setReportIdsToDelete] = useState<string[]>([]);
  const [reportIdToView, setReportIdToView] = useState<string | null>(null);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const [dashboardReports, setDashboardReports] = useState<StoredReport[]>([]);

  const handleUpdateDashboardWidget = (id: string, updatedItem: Partial<StoredReport>) => {
    setDashboardReports((prev) =>
      prev.map((widget) => (widget.id === id ? { ...widget, ...updatedItem } : widget)),
    );
  };

  const containerRef = useRef<HTMLDivElement>(null);

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
    setDashboardReports(reportToAddToDashboard);
    setSelectedReports([]);
  };

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 68px)', display: 'flex', bgcolor: 'background.default' }}>
        <Paper sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {dashboardReports.length === 0 ? (
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
          ) : (
            <div>make a grid settings component, for the dashboardItems i render</div>
          )}
        </Paper>

        {/* Dashboard Section */}
        <Box
          ref={containerRef}
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
            <DashBoardGrid
              dashboardReports={dashboardReports}
              containerRef={containerRef}
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
