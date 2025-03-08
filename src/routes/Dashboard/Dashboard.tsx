import { useReportStore } from '@/lib/reports.store.ts';
import { Box, Button, Typography } from '@mui/material';
import { Chart } from '@/components';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useEffect, useRef, useState } from 'react';

export const Dashboard = () => {
  const [gridWidth, setGridWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const { dashboard, clearDashboard } = useReportStore();

  if (!dashboard) {
    return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={10}>
        No dashboard found
      </Box>
    );
  }

  const { layout, reports } = dashboard;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box mt={2} mx={2}>
        <Button variant={'outlined'} color={'error'} onClick={clearDashboard}>
          Delete Dashboard
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
            isResizable={false}
            isDraggable={false}
            useCSSTransforms
          >
            {reports.map((rep) => {
              // Find matching layout item
              const gridItem = layout.find((l) => l.i === rep.id.toString());
              if (!gridItem) return null; // Ensure valid data

              return (
                <Box
                  key={rep.id}
                  data-grid={{
                    i: rep.id.toString(),
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
                  <Typography variant="h6" gutterBottom className="drag-handle" sx={{ cursor: 'grab' }}>
                    {rep.question}
                  </Typography>

                  <Chart colData={rep.values} defaultTab={rep.type} type={rep.type} />
                </Box>
              );
            })}
          </GridLayout>
        </Box>
      </Box>
    </div>
  );
};
