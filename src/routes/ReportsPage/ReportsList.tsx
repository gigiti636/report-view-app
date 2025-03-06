import { List, ListItem, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StoredReport } from '@/lib/types';

interface ReportsListProps {
  reports: StoredReport[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ReportsList = ({ reports, onView, onDelete }: ReportsListProps) => {
  return (
    <Paper
      sx={{
        width: '25%',
        height: '100%',
        overflowY: 'auto',
        p: 1,
      }}
    >
      {reports.length === 0 ? (
        <Typography variant="body1">No reports available.</Typography>
      ) : (
        <List>
          {reports.map((report) => (
            <ListItem
              key={report.id}
              secondaryAction={
                <>
                  {/* Eye Icon for Viewing Report */}
                  <IconButton edge="end" aria-label="view" onClick={() => onView(report.id)}>
                    <VisibilityIcon />
                  </IconButton>

                  {/* Delete Icon for Removing Report */}
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(report.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={report.question} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
