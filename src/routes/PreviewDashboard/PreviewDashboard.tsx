import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Dashboard } from '@/components';

export const PreviewDashboard = () => {
  const [searchParams] = useSearchParams();
  const dashboardData = searchParams.get('data');
  const dashboardTitle = searchParams.get('title');

  if (!dashboardData) {
    return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={10}>
        Invalid dashboard data
      </Box>
    );
  }

  try {
    const dashboard = JSON.parse(decodeURIComponent(dashboardData));
    return (
      <>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'text.secondary',
            letterSpacing: 1.2,
            mt: 3,
            mx: 2,
          }}
        >
          {dashboardTitle}
        </Typography>
        <Dashboard dashboard={dashboard} />;
      </>
    );
  } catch (error) {
    return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={10}>
        Error loading dashboard
      </Box>
    );
  }
};
