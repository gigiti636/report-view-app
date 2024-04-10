import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { isValidTimestamp } from '@/util';

interface ChartProps {
  id: number;
  colData: Record<string, number>;
  handleGroupID: (_id: number) => void;
}
export default function Chart({ colData, id, handleGroupID }: ChartProps) {
  const is_timestamps = Object.keys(colData).every((value) => isValidTimestamp(value));

  if (is_timestamps) {
    /*    console.log(
      Object.keys(colData)
        .map((value) => value)
        .sort((a, b) => {
          return dayjs(a).hour() - dayjs(b).hour();
        }),
    );*/
  }

  if (is_timestamps) {
    const data = Object.keys(colData).map((timestamp, index) => {
      const date = dayjs(timestamp);
      return {
        x: date.hour() + date.minute() / 60,
        y: dayjs(date).day(),
        id: `data-${index}`,
      };
    });

    return <ScatterChart height={300} series={[{ data: data }]} />;
  }

  const labels = [];
  const freq = [];

  for (const key in colData) {
    labels.push(key);
    freq.push(colData[key]);
  }

  const data_can_be_grouped = labels.some((v) => v.includes(', '));

  return (
    <>
      {data_can_be_grouped && (
        <Button variant={'contained'} onClick={() => handleGroupID(id)}>
          Group Data
        </Button>
      )}

      <BarChart
        height={300}
        series={[{ data: freq, /*label: 'uv',*/ id: 'uvId', stack: 'total' }]}
        xAxis={[{ data: labels, scaleType: 'band' }]}
      />
    </>
  );
}
