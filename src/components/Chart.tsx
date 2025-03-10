import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Tabs, Tab, Box, CircularProgress, Typography } from '@mui/material';
import { ChartType } from '@/lib/types.ts';

export interface ChartProps {
  colData: Record<string, number>;
  defaultTab?: ChartType;
  type: ChartType;
  handleUpdateChartType?: (_type: ChartType) => void;
  delay?: number;
}

export default function Chart({ colData, defaultTab, type, handleUpdateChartType, delay = 0 }: ChartProps) {
  const [activeTab, setActiveTab] = useState(type || 'bar');
  const [isLoaded, setIsLoaded] = useState(delay === 0); // If delay is 0, load immediately

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsLoaded(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const labels = Object.keys(colData);
  const freq = Object.values(colData);

  const chartHeight = 300;

  return (
    <Box sx={{ position: 'relative', minHeight: chartHeight }}>
      {!isLoaded ? (
        // ⬇️ Show a loading spinner during the delay
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress size={30} />
        </Box>
      ) : (
        // ⬇️ Render chart after delay
        <>
          {/* Tabs for selecting chart type */}
          {!defaultTab && (
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => {
                setActiveTab(newValue);
                if (handleUpdateChartType) handleUpdateChartType(newValue);
              }}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 2 }}
            >
              <Tab label="Bar Chart" value="bar" />
              <Tab label="Pie Chart" value="pie" />
              <Tab label="Donut Chart" value="donut" />
              <Tab label="Line Chart" value="line" />
            </Tabs>
          )}
          {/* Conditional rendering of charts based on active tab */}
          {activeTab === 'bar' && (
            <BarChart
              height={chartHeight}
              series={[{ data: freq, id: 'uvId', stack: 'total' }]}
              xAxis={[{ data: labels, scaleType: 'band' }]}
            />
          )}

          {activeTab === 'pie' && (
            <>
              <PieChart
                height={chartHeight}
                series={[
                  {
                    data: labels.map((label, index) => ({
                      id: index,
                      value: freq[index],
                      label,
                    })),
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: 'column',
                    labelStyle: { fontSize: '10px' },
                  },
                }}
              />
              {/*  <CustomTextLegend labels={labels} />*/}
            </>
          )}
          {activeTab === 'donut' && (
            <>
              <PieChart
                height={chartHeight}
                series={[
                  {
                    data: labels.map((label, index) => ({
                      id: index,
                      value: freq[index],
                      label,
                    })),
                    innerRadius: 70, // Makes it a donut chart
                  },
                ]}
                slotProps={{
                  legend: { direction: 'column', position: { vertical: 'middle', horizontal: 'right' } },
                }}
              />
              {/*            <CustomTextLegend labels={labels} />*/}
            </>
          )}
          {activeTab === 'line' && (
            <LineChart
              height={chartHeight}
              series={[{ data: freq, id: 'lineData' }]}
              xAxis={[{ data: labels, scaleType: 'point' }]}
            />
          )}
        </>
      )}
    </Box>
  );
}

interface ChartLegendProps {
  labels: string[];
}

console.log(CustomTextLegend);
function CustomTextLegend({ labels }: ChartLegendProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        mt: 2,
      }}
    >
      {labels.map((label, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: `var(--mui-color-${index})`,
              borderRadius: '50%',
            }}
          />
          <Typography variant="caption">{label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
