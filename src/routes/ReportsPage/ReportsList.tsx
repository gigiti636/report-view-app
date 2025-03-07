import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StoredReport } from '@/lib/types';
import { useTheme } from '@mui/material/styles';

interface ReportsListProps {
  reports: StoredReport[];
  selectedReports: string[];
  onSelect: (_id: string) => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
  onView: (_id: string) => void;
  onDelete: (_id: string) => void;
  handleDeleteSelected: () => void;
  handleSentToDashboard: () => void;
}

export const ReportsList = ({
  reports,
  selectedReports,
  onSelect,
  onClearSelection,
  onSelectAll,
  onView,
  onDelete,
  handleDeleteSelected,
  handleSentToDashboard,
}: ReportsListProps) => {
  const theme = useTheme();

  return (
    <Paper sx={{ width: '20%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/*  Fixed Control Section */}
      <Box
        sx={{
          p: 1,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          borderBottom: `2px solid ${theme.palette.divider}`,
        }}
      >
        <Box my={1} display="flex" flexDirection={'column'} gap={'12px'}>
          <Box display="flex" alignItems="center" gap="10px">
            <Typography variant="body1" flexGrow={1}>
              Selected: {selectedReports.length}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={onClearSelection}
              disabled={selectedReports.length === 0}
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                borderColor: theme.palette.mode === 'dark' ? 'grey.600' : 'inherit',
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark' ? 'grey.400' : 'inherit',
                },
              }}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={onSelectAll}
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                borderColor: theme.palette.mode === 'dark' ? 'grey.600' : 'inherit',
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark' ? 'grey.400' : 'inherit',
                },
              }}
            >
              Select All
            </Button>
          </Box>

          <Stack direction={'row'} gap={3}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={handleSentToDashboard}
              disabled={selectedReports.length === 0}
              sx={{
                flex: 1,
                bgcolor: theme.palette.success.main,
                '&:hover': {
                  bgcolor: theme.palette.success.dark,
                },
              }}
            >
              Add to Dashboard
            </Button>
            <Button
              color={'error'}
              title={'delete selected reports'}
              onClick={handleDeleteSelected}
              disabled={selectedReports.length === 0}
            >
              Delete selected
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Scrollable List */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
        {reports.length === 0 ? (
          <Typography variant="body1" mt={2} textAlign={'center'}>
            No reports available.
          </Typography>
        ) : (
          <List>
            {reports.map((report) => (
              <ListItem
                divider
                key={report.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="view" onClick={() => onView(report.id)}>
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(report.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Checkbox
                  edge="start"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => onSelect(report.id)}
                />
                <ListItemText
                  primary={report.question}
                  sx={{ pl: 1, pr: 3, '& .MuiTypography-root': { fontSize: '14px' } }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};
