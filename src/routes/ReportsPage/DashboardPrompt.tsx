import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/AppRouter.tsx';
import { useState } from 'react';
import { ReportEdit } from '@/components';
import { useReportStore } from '@/lib/reports.store.ts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface DashBoardPromptProps {
  hasReports: boolean;
  handleCreated: (_id: string) => void;
}

export const DashBoardPrompt: React.FC<DashBoardPromptProps> = ({
  hasReports,
  handleCreated,
}: DashBoardPromptProps) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(routes.insertReports);
  };

  const { addReports } = useReportStore();

  const [isCreateReport, setIsCreateReport] = useState(false);

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {isCreateReport ? (
        <Box display={'flex'} flexDirection={'column'} height={'90%'} width={'90%'}>
          <Typography variant={'h5'} color={'text.secondary'} display={'flex'} alignItems={'center'}>
            <IconButton color={'inherit'} onClick={() => setIsCreateReport(false)}>
              <ArrowBackIosIcon />
            </IconButton>
            Create Report
          </Typography>

          <ReportEdit
            handleSave={(_data) => {
              addReports([_data]);
              handleCreated(_data.id);
              setIsCreateReport(false);
            }}
            handleCancel={() => setIsCreateReport(false)}
          />
        </Box>
      ) : (
        <Box sx={{ border: 1, borderColor: 'info.main', p: 4, borderRadius: '12px', textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {!hasReports ? 'No reports found' : 'Select reports and'}
          </Typography>

          {hasReports && (
            <>
              <Typography variant="h5" color="info.main">
                And create a Dashboard!
              </Typography>
            </>
          )}

          <div>
            <Button
              variant="text"
              color="primary"
              onClick={handleRedirect}
              sx={{ textDecoration: 'underline!important' }}
            >
              Insert Reports
            </Button>
            <Typography variant="subtitle1" color="info.main">
              or
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => setIsCreateReport(true)}
              sx={{ textDecoration: 'underline!important' }}
            >
              Create a report
            </Button>
          </div>
        </Box>
      )}
    </Paper>
  );
};
