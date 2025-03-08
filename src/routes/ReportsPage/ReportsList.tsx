import { Box, Button, Checkbox, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
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

  const handleHeaderCheckboxClick = () => {
    if (selectedReports.length === reports.length) {
      onClearSelection();
    } else {
      onSelectAll();
    }
  };

  return (
    <>
      {/*  Fixed Control Section */}
      <Box
        sx={{
          p: 1,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          borderBottom: `2px solid ${theme.palette.divider}`,
        }}
      >
        <Box display="flex" flexDirection={'column'}>
          <Box display="flex" alignItems="center" gap="10px">
            <Checkbox
              indeterminate={selectedReports.length > 0 && selectedReports.length < reports.length}
              checked={selectedReports.length === reports.length}
              onClick={handleHeaderCheckboxClick}
            />
            <Typography variant="body1" flexGrow={1} fontWeight={'bold'}>
              Selected: {selectedReports.length}
            </Typography>

            <Button
              color={'error'}
              variant={'outlined'}
              title={'delete selected reports'}
              onClick={handleDeleteSelected}
              disabled={selectedReports.length === 0}
            >
              Delete selected
            </Button>
          </Box>
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

      <Box mb={3} mt={1} display={'flex'} px={2}>
        <Button
          variant="contained"
          size="medium"
          color="success"
          disabled={selectedReports.length === 0}
          onClick={handleSentToDashboard}
          sx={{
            flex: 1,
            bgcolor: theme.palette.success.main,
            '&:hover': {
              bgcolor: theme.palette.success.dark,
            },
          }}
        >
          Create Dashboard
        </Button>
      </Box>
    </>
  );
};
