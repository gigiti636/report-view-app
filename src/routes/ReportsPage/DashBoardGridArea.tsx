import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { RefObject, useEffect, useRef } from 'react';
import { DashBoardWidget, StoredReport } from '@/lib/types.ts';
import { Chart } from '@/components';

interface DashBoardGridProps {
  dashboardReports: StoredReport[];
  handleBackToReports: () => void;
  handleUpdateDashboardWidget: (_id: string, _partialStoredItem: Partial<DashBoardWidget>) => void;
  containerRef: RefObject<HTMLDivElement>;
}

export const DashBoardGridArea = ({
  dashboardReports,
  handleBackToReports,
  containerRef,
}: DashBoardGridProps) => {
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup observer on unmount
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [containerRef]);

  const ras = [4, 4, 6, 6, 12];
  const ran = [8, 7, 6, 5, 4, 3];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" onClick={handleBackToReports} sx={{ cursor: 'pointer' }}>
          {'< '}Back to Reports
        </Link>

        <Typography color="text.primary">Draft Dashboard</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          flex: 1,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Scrollable Grid */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              overflowY: 'auto',
              pr: 1,
              pt: 3,
              pb: 7,
            }}
          >
            <Grid container spacing={2}>
              {dashboardReports.map((report, index) => (
                <Grid
                  item
                  xs={ras[index % ras.length]}
                  order={ran[index % ras.length]}
                  key={report.id}
                  sx={{ '.MuiBox-root': { padding: 4 } }}
                >
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ pt: 1, pb: 2 }}>
                      {report.question}
                    </Typography>
                    <Chart colData={report.values} defaultTab={report.type} type={report.type} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
