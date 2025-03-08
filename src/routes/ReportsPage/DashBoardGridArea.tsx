import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { StoredReport } from '@/lib/types.ts';
import { Chart, Modal } from '@/components';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useState, useRef, useEffect } from 'react';
import { useReportStore } from '@/lib/reports.store.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/AppRouter.tsx';

interface DashBoardGridProps {
  dashboardReports: StoredReport[];
  handleBackToReports: () => void;
}

export const DashBoardGridArea = ({ dashboardReports, handleBackToReports }: DashBoardGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setGridWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Ensure all values are correct numbers
  const initialLayout = dashboardReports.map((report, index) => ({
    i: report.id.toString(),
    x: (index % 2) * 6,
    y: Math.floor(index / 2) * 2,
    w: 6,
    h: 3,
  }));

  const [layout, setLayout] = useState(initialLayout);

  const { addDashboard, dashboard } = useReportStore();
  const navigate = useNavigate();

  const [showSaveConformation, setSaveConformation] = useState(false);

  const handleSaveDashboard = () => {
    addDashboard(layout, dashboardReports);
    navigate(routes.dashboard);
  };

  return (
    <>
      <Modal
        header={'Save new Dashboard'}
        open={showSaveConformation}
        onClose={() => setSaveConformation(false)}
        closeModal={() => setSaveConformation(false)}
        callToAction={handleSaveDashboard}
      >
        Saving dashboard will overwrite existing dashboard
      </Modal>

      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Box display={'flex'} gap={4} alignItems={'center'}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
            <Link underline="hover" color="inherit" onClick={handleBackToReports} sx={{ cursor: 'pointer' }}>
              {'< '}Back to Reports
            </Link>
            <Typography color="text.primary">Draft Dashboard</Typography>
          </Breadcrumbs>

          <Button
            variant={'contained'}
            onClick={dashboard ? () => setSaveConformation(true) : handleSaveDashboard}
          >
            Save Dashboard
          </Button>
        </Box>

        <Box sx={{ flex: 1, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, width: '100%', overflowY: 'auto', pr: 1, pt: 3, pb: 7 }}>
            <GridLayout
              className="layout"
              layout={layout}
              cols={12}
              rowHeight={120}
              width={gridWidth}
              draggableHandle=".drag-handle"
              onLayoutChange={(newLayout) => setLayout(newLayout)}
              isResizable
              isDraggable
              useCSSTransforms
            >
              {dashboardReports.map((report) => {
                // Find matching layout item
                const gridItem = layout.find((l) => l.i === report.id.toString());
                if (!gridItem) return null; // Ensure valid data

                return (
                  <Box
                    key={report.id}
                    data-grid={{
                      i: report.id.toString(),
                      x: gridItem.x,
                      y: gridItem.y,
                      w: gridItem.w,
                      h: gridItem.h,
                    }}
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                      position: 'relative',
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Drag handle */}
                    <Typography variant="h6" gutterBottom className="drag-handle" sx={{ cursor: 'grab' }}>
                      {report.question}
                    </Typography>

                    {/* Chart Component */}
                    <Chart colData={report.values} defaultTab={report.type} type={report.type} />
                  </Box>
                );
              })}
            </GridLayout>
          </Box>
        </Box>
      </div>
    </>
  );
};
