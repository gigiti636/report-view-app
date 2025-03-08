import { Chart, EditableText } from '@/components';
import { useReportStore } from '@/lib/reports.store.ts';
import { Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface ReportPreviewModalProps {
  reportIdToView: string | null;
  handleClose: () => void;
}

export const ReportPreview = ({ reportIdToView, handleClose }: ReportPreviewModalProps) => {
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
      <Box mb={3}>
        <Box
          display={'inline-flex'}
          p={2}
          alignItems={'center'}
          onClick={handleClose}
          color={'text.secondary'}
          fontWeight={'bold'}
          sx={{ cursor: 'pointer' }}
        >
          <ArrowBackIosIcon />
          Close preview
        </Box>
      </Box>
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
