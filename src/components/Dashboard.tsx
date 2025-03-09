import { Box, Typography } from '@mui/material';
import { Chart } from '@/components';
import GridLayout, { type Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useLayoutEffect, useRef, useState } from 'react';
import type { DashboardType } from '@/lib/types.ts';

interface DashboardProp {
  dashboard: DashboardType;
  isEdit?: boolean;
  onNewLayout?: (_layout: Layout[]) => void;
}

export const Dashboard = ({ dashboard, isEdit, onNewLayout }: DashboardProp) => {
  const [gridWidth, setGridWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setGridWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const { layout: layoutInitState, reports } = dashboard;
  const [layout, setLayout] = useState(layoutInitState);

  const handleNewLayout = (newLayout: Layout[]) => {
    if (isEdit && onNewLayout) onNewLayout(newLayout);
    setLayout(newLayout);
  };

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        {containerRef && (
          <Box sx={{ flex: 1, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, width: '100%', overflowY: 'auto', pr: 1, pt: 3, pb: 7 }}>
              <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={120}
                width={gridWidth}
                draggableHandle=".drag-handle"
                onLayoutChange={isEdit ? handleNewLayout : undefined}
                isResizable={!!isEdit}
                isDraggable={!!isEdit}
                useCSSTransforms={false}
                resizeHandles={['se', 'sw', 'w', 'e', 's']}
              >
                {reports.map((report, index) => {
                  const gridItem = layout.find((l) => l.i === report.id.toString());
                  if (!gridItem) return null;

                  const delay = index > 5 ? 1200 : Math.floor(index) * 400;

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
                        cursor: isEdit ? 'grab' : 'default',
                      }}
                      className={isEdit ? 'drag-handle' : ''}
                    >
                      <>
                        {/* Drag handle */}
                        <Typography variant="h6" gutterBottom color={'text.primary'}>
                          {report.question}
                        </Typography>

                        <Chart
                          colData={report.values}
                          defaultTab={report.type}
                          type={report.type}
                          delay={delay}
                        />
                      </>
                    </Box>
                  );
                })}
              </GridLayout>
            </Box>
          </Box>
        )}
      </div>
    </>
  );
};
