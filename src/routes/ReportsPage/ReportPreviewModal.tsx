import { Chart, EditableText, Modal } from '@/components';
import { useReportStore } from '@/lib/reports.store.ts';
import { Box } from '@mui/material';

interface ReportPreviewModalProps {
  reportIdToView: string | null;
  onClose: () => void;
}

export const ReportPreviewModal = ({ reportIdToView, onClose }: ReportPreviewModalProps) => {
  const { reports, updateReport } = useReportStore();

  const report = reports.find((report) => report.id === reportIdToView)!;
  if (!report) return null;
  return (
    <Modal
      header={'Inspect Report'}
      open={Boolean(reportIdToView)}
      onClose={onClose}
      closeModal={onClose}
      callToActionLabel={'Close'}
      callToAction={onClose}
      maxWidth={'750'}
    >
      <Box pt={3} pb={3}>
        <Box display={'flex'}>
          <EditableText
            text={report.question}
            onSave={(newValue) => {
              updateReport(report.id, { question: newValue });
            }}
          />
        </Box>
        <Chart colData={report.values} />
      </Box>
    </Modal>
  );
};
