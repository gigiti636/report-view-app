import { Box, Button, Checkbox, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StoredReport } from '@/lib/types';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/AppRouter.tsx';
import { useReportStore } from '@/lib/reports.store.ts';

interface ReportsListProps {
  reportIdFocus: string | null; // Updated type to match ID format
  reports: StoredReport[];
  selectedReports: string[];
  onSelect: (_id: string) => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
  onView: (_id: string) => void;
  onDelete: (_id: string) => void;
  handleDeleteSelected: () => void;
}

export const ReportsList = ({
  reportIdFocus,
  reports,
  selectedReports,
  onSelect,
  onClearSelection,
  onSelectAll,
  onView,
  onDelete,
  handleDeleteSelected,
}: ReportsListProps) => {
  const theme = useTheme();

  const handleHeaderCheckboxClick = () => {
    if (selectedReports.length === reports.length) {
      onClearSelection();
    } else {
      onSelectAll();
    }
  };

  const navigate = useNavigate();
  const { addDashboard } = useReportStore();
  const handleSentToDashboard = () => {
    navigate(routes.dashboard);

    const initialLayout = reports.map((report, index) => ({
      i: report.id.toString(),
      x: (index % 2) * 6,
      y: Math.floor(index / 2) * 2,
      w: 6,
      h: 3,
    }));

    addDashboard({
      layout: initialLayout,
      reports: reports.filter((report) => selectedReports.includes(report.id)),
    });
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
              title={'Delete selected reports'}
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
            {reports.map((report) => {
              const isPreviewed = report.id === reportIdFocus; // Check if the report is being previewed

              //report.isNew
              return (
                <ListItem
                  divider
                  key={report.id}
                  sx={{
                    ...(isPreviewed && {
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 1,
                    }),
                    bgcolor: isPreviewed ? theme.palette.action.selected : 'inherit', // Highlight previewed item
                    fontWeight: isPreviewed ? 'bold' : 'normal',
                    transition: 'background 0.2s ease-in-out',
                  }}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="view" onClick={() => onView(report.id)}>
                        {isPreviewed ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                    sx={{
                      pl: 1,
                      pr: 3,
                      '& .MuiTypography-root': { fontSize: '14px' },
                      fontWeight: isPreviewed ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>

      {/* Dashboard Button */}
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
