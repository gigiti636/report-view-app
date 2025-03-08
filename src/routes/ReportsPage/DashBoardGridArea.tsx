import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { DashBoardWidget, StoredReport } from '@/lib/types.ts';
import { Chart } from '@/components';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface DashBoardGridProps {
  dashboardReports: StoredReport[];
  handleBackToReports: () => void;
  handleUpdateDashboardWidget: (_id: string, _partialStoredItem: Partial<DashBoardWidget>) => void;
}

export const DashBoardGridArea = ({ dashboardReports, handleBackToReports }: DashBoardGridProps) => {
  const ras = [4, 4, 6, 6, 12];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" onClick={handleBackToReports} sx={{ cursor: 'pointer' }}>
          {'< '}Back to Reports
        </Link>

        <Typography color="text.primary">Draft Dashboard</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          flex: 1,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Scrollable Grid */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              overflowY: 'auto',
              pr: 1,
              pt: 3,
              pb: 7,
            }}
          >
            <Grid container spacing={2}>
              {dashboardReports.map((report, index) => (
                <Grid
                  item
                  xs={ras[index % ras.length]}
                  key={report.id}
                  sx={{ '.MuiBox-root': { padding: 4 } }}
                >
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                      position: 'relative',
                      paddingTop: 3,
                    }}
                  >
                    <IconButton sx={{ position: 'absolute', top: 8, left: 8 }} size="small">
                      <ArrowBack />
                    </IconButton>
                    <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} size="small">
                      <ArrowForward />
                    </IconButton>

                    <Typography variant="h6" gutterBottom sx={{ pt: 1, pb: 2 }}>
                      {report.question}
                    </Typography>
                    <Chart colData={report.values} defaultTab={report.type} type={report.type} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
