import { Box, Paper, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReportStore } from '@/stores/reports.store.ts';
import type { StoredReport } from '@/lib/types.ts';

export const ReportsPage = () => {
  const { reports, removeReport } = useReportStore(); // Get reports & delete function

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Reports List
      </Typography>

      <Paper sx={{ p: 2, maxWidth: 400 }}>
        {reports.length === 0 ? (
          <Typography variant="body1">No reports available.</Typography>
        ) : (
          <List>
            {reports.map((report: StoredReport) => (
              <ListItem
                key={report.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeReport(report.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={report.question} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};
