import { Box, Button } from '@mui/material';
import { Chart } from '@/components';
import { ChartProps } from '@/components/Chart.tsx';

interface ControlChartProps extends ChartProps {
  id: number;
  handleGroupID: (_id: number) => void;
}

export default function ChartControl({
  colData,
  type,
  id,
  handleGroupID,
  handleUpdateChartType,
}: ControlChartProps) {
  const labels = Object.keys(colData);
  const data_can_be_grouped = labels.some((v) => v.includes(', '));

  return (
    <Box>
      <Chart colData={colData} type={type} handleUpdateChartType={handleUpdateChartType} />

      {/* Group Data Button (Shown only if grouping is possible) */}
      {data_can_be_grouped && (
        <Button variant="contained" onClick={() => handleGroupID(id)} sx={{ mt: 2 }}>
          Group Data
        </Button>
      )}
    </Box>
  );
}
