import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Tabs, Tab, Button, Box } from '@mui/material';
import dayjs from 'dayjs';
import { isValidTimestamp } from '@/lib/utils.ts';

interface ChartProps {
  id: number;
  colData: Record<string, number>;
  handleGroupID: (_id: number) => void;
}

export default function Chart({ colData, id, handleGroupID }: ChartProps) {
  const [activeTab, setActiveTab] = useState('bar');
  const is_timestamps = Object.keys(colData).every((value) => isValidTimestamp(value));

  let scatterData: { x: number; y: number; id: string }[] = [];
  if (is_timestamps) {
    scatterData = Object.keys(colData).map((timestamp, index) => {
      const date = dayjs(timestamp);
      return {
        x: date.hour() + date.minute() / 60,
        y: date.day(),
        id: `data-${index}`,
      };
    });
  }

  const labels = Object.keys(colData);
  const freq = Object.values(colData);

  const data_can_be_grouped = labels.some((v) => v.includes(', '));

  return (
    <Box>
      {/* Tabs for selecting chart type */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Bar Chart" value="bar" />
        <Tab label="Pie Chart" value="pie" />
        <Tab label="Donut Chart" value="donut" />
        <Tab label="Line Chart" value="line" />
        {is_timestamps && <Tab label="Scatter Chart" value="scatter" />}
      </Tabs>

      {/* Conditional rendering of charts based on active tab */}
      {activeTab === 'bar' && (
        <BarChart
          height={300}
          series={[{ data: freq, id: 'uvId', stack: 'total' }]}
          xAxis={[{ data: labels, scaleType: 'band' }]}
        />
      )}

      {activeTab === 'pie' && (
        <PieChart
          height={300}
          series={[
            {
              data: labels.map((label, index) => ({
                id: index,
                value: freq[index],
                label,
              })),
            },
          ]}
        />
      )}

      {activeTab === 'donut' && (
        <PieChart
          height={300}
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
        />
      )}

      {activeTab === 'line' && (
        <LineChart
          height={300}
          series={[{ data: freq, id: 'lineData' }]}
          xAxis={[{ data: labels, scaleType: 'point' }]}
        />
      )}

      {activeTab === 'scatter' && is_timestamps && (
        <ScatterChart height={300} series={[{ data: scatterData }]} />
      )}

      {/* Group Data Button (Shown only if grouping is possible) */}
      {data_can_be_grouped && (
        <Button variant="contained" onClick={() => handleGroupID(id)} sx={{ mt: 2 }}>
          Group Data
        </Button>
      )}
    </Box>
  );
}
