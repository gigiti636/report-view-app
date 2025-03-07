import { Box, Grid } from '@mui/material';
import { RefObject, useEffect, useRef } from 'react';
import { StoredReport } from '@/lib/types.ts';
import { Chart, EditableText } from '@/components';

interface DashBoardGridProps {
  dashboardReports: StoredReport[];
  handleUpdateDashboardWidget: (_id: string, _partialStoredItem: Partial<StoredReport>) => void;
  containerRef: RefObject<HTMLDivElement>;
}

export const DashBoardGridArea = ({
  dashboardReports,
  handleUpdateDashboardWidget,
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

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box
        sx={{
          flex: 1,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
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
            p: 4,
            overflow: 'hidden',
          }}
        >
          {/* Scrollable Grid */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              overflowY: 'auto',
              maxHeight: 'calc(100% - 20px)',
              pr: 1,
            }}
          >
            <Grid container spacing={2}>
              {dashboardReports.map((report) => (
                <Grid item xs={6} key={report.id}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <EditableText
                      onSave={(newText) => {
                        handleUpdateDashboardWidget(report.id, { question: newText });
                      }}
                      text={report.question}
                    />
                    <Chart
                      colData={report.values}
                      type={report.type}
                      handleUpdateChartType={(newType) =>
                        handleUpdateDashboardWidget(report.id, { type: newType })
                      }
                    />
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
