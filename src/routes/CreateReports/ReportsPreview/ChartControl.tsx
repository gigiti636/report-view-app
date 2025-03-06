import { Box, Button } from '@mui/material';
import { Chart } from '@/components';

interface ChartProps {
  id: number;
  colData: Record<string, number>;
  handleGroupID: (_id: number) => void;
}

export default function ChartControl({ colData, id, handleGroupID }: ChartProps) {
  const labels = Object.keys(colData);
  const data_can_be_grouped = labels.some((v) => v.includes(', '));

  return (
    <Box>
      <Chart colData={colData} />

      {/* Group Data Button (Shown only if grouping is possible) */}
      {data_can_be_grouped && (
        <Button variant="contained" onClick={() => handleGroupID(id)} sx={{ mt: 2 }}>
          Group Data
        </Button>
      )}
    </Box>
  );
}
