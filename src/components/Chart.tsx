import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Tabs, Tab, Box } from '@mui/material';

interface ChartProps {
  colData: Record<string, number>;
  defaultTab?: ChartType;
}

export type ChartType = 'bar' | 'pie' | 'donut' | 'line';

export default function Chart({ colData, defaultTab }: ChartProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || 'bar');

  const labels = Object.keys(colData);
  const freq = Object.values(colData);

  return (
    <Box>
      {/* Tabs for selecting chart type */}
      {!defaultTab && (
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
        </Tabs>
      )}

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
    </Box>
  );
}
