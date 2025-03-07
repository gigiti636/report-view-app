import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/AppRouter.tsx';

interface DashBoardPromptProps {
  hasReports: boolean;
}

export const DashBoardPrompt: React.FC<DashBoardPromptProps> = ({ hasReports }: { hasReports: boolean }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(routes.main);
  };

  return (
    <Box sx={{ border: 1, borderColor: 'info.main', p: 4, borderRadius: '12px', textAlign: 'center' }}>
      <Typography variant="body1" color="text.secondary">
        {!hasReports ? 'No reports found' : 'Select reports and'}
      </Typography>

      {!hasReports ? (
        <Button
          variant="text"
          color="primary"
          onClick={handleRedirect}
          sx={{ textDecoration: 'underline!important' }}
        >
          Create Reports
        </Button>
      ) : (
        <Typography variant="h5" color="info.main">
          Add Reports to Dashboard
        </Typography>
      )}
    </Box>
  );
};
