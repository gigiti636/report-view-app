import { Chart, ReportEdit } from '@/components';
import { useReportStore } from '@/lib/reports.store.ts';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
        <Box display={'flex'} alignItems={'center'}>
          <Box
            display={'inline-flex'}
            p={2}
            alignItems={'center'}
            onClick={editReportMode ? () => setEditReportMode(false) : handleBackButtonClick}
            color={'text.secondary'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
          >
            <IconButton title={'Go back'}>
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
          <Typography variant={'h5'} fontWeight={'bold'} color={'primary.main'}>
            Report Preview
          </Typography>
          {/* Edit Button */}
          {!editReportMode && (
            <IconButton onClick={() => setEditReportMode(true)} title={'Edit Report'}>
              <EditOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {!editReportMode ? (
        <>
          <Box pb={6}>
            <Typography variant={'h6'} color={'text.secondary'}>
              Question:
            </Typography>
            <Typography color={'text.primary'} variant={'body2'} fontWeight={'500'}>
              {report.question}
            </Typography>
          </Box>
          <Box>
            <Typography variant={'h6'} color={'text.secondary'}>
              Default Chart:
            </Typography>
            <Chart
              colData={report.values}
              type={report.type}
              handleUpdateChartType={(newType) => updateReport(report.id, { type: newType })}
            />
          </Box>
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
