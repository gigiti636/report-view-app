import { Chart, EditableText, ReportEdit } from '@/components';
import { useReportStore } from '@/lib/reports.store.ts';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

interface ReportPreviewModalProps {
  reportIdToView: string | null;
  handleBackButtonClick: () => void;
}

export const ReportPreview = ({ reportIdToView, handleBackButtonClick }: ReportPreviewModalProps) => {
  const { reports, updateReport } = useReportStore();
  const [editReportMode, setEditReportMode] = useState(false);

  const report = reports.find((report) => report.id === reportIdToView);
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
      <Box mb={3} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        {/* Close Button */}
        <Box
          display={'inline-flex'}
          p={2}
          alignItems={'center'}
          onClick={editReportMode ? () => setEditReportMode(false) : handleBackButtonClick}
          color={'text.secondary'}
          fontWeight={'bold'}
          sx={{ cursor: 'pointer' }}
        >
          <ArrowBackIosIcon />
        </Box>

        {/* Edit Button */}
        {!editReportMode && (
          <IconButton onClick={() => setEditReportMode(true)}>
            <SettingsIcon />
          </IconButton>
        )}
      </Box>

      {!editReportMode ? (
        <>
          <Box pb={6}>
            <EditableText
              text={report.question}
              onSave={(newValue) => updateReport(report.id, { question: newValue })}
            />
          </Box>
          <Chart
            colData={report.values}
            type={report.type}
            handleUpdateChartType={(newType) => updateReport(report.id, { type: newType })}
          />
        </>
      ) : (
        <>
          <ReportEdit
            data={report}
            handleSave={(updatedReport) => {
              setEditReportMode(false);
              updateReport(report.id, updatedReport);
            }}
            handleCancel={() => setEditReportMode(false)}
          />
        </>
      )}
    </Box>
  );
};
