import { Chart, EditableText } from '@/components';
import { useReportStore } from '@/lib/reports.store.ts';
import { Box } from '@mui/material';

interface ReportPreviewModalProps {
  reportIdToView: string | null;
}

export const ReportPreview = ({ reportIdToView }: ReportPreviewModalProps) => {
  const { reports, updateReport } = useReportStore();

  const report = reports.find((report) => report.id === reportIdToView)!;
  if (!report) return null;
  return (
    <Box
      py={5}
      px={3}
      bgcolor={'background.paper'}
      borderRadius={4}
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box pb={6}>
        <EditableText
          text={report.question}
          onSave={(newValue) => {
            updateReport(report.id, { question: newValue });
          }}
        />
      </Box>
      <Chart
        colData={report.values}
        type={report.type}
        handleUpdateChartType={(newType) => updateReport(report.id, { type: newType })}
      />
    </Box>
  );
};
