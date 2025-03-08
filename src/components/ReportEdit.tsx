import { useState, useCallback, useMemo } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { ChartType, StoredReport } from '@/lib/types.ts';
import { nanoid } from 'nanoid';
import { renameKeyPreserveOrder } from '@/lib/utils.ts';

export const ReportEdit = ({
  data = { id: nanoid(), question: '', values: { 'New Label 1': 5, 'New Label 2': 5 }, type: ChartType.Bar },
  handleSave,
  handleCancel,
}: {
  data?: StoredReport;
  handleSave?: (_data: StoredReport) => void;
  handleCancel?: () => void;
}) => {
  const [question, setQuestion] = useState(data.question);
  const [type, setType] = useState(data.type);
  const [values, setValues] = useState<{ [key: string]: number | '' }>({ ...data.values });

  const handleLabelChange = useCallback((oldKey: string, newKey: string) => {
    setValues((prevValues) => renameKeyPreserveOrder(prevValues as never, oldKey, newKey));
  }, []);

  const handleValueChange = useCallback((key: string, newValue: string) => {
    const parsedValue = newValue === '' ? '' : Number(newValue);
    if (parsedValue === '' || (!isNaN(parsedValue) && parsedValue >= 0)) {
      setValues((prev) => ({
        ...prev,
        [key]: parsedValue,
      }));
    }
  }, []);

  const handleAddEntry = useCallback(() => {
    const newKey = `New Label ${Object.keys(values).length + 1}`;
    setValues((prev) => ({
      ...prev,
      [newKey]: 1,
    }));
  }, [values]);

  const handleRemoveEntry = useCallback((key: string) => {
    setValues((prev) => {
      const newValues = { ...prev };
      delete newValues[key];
      return newValues;
    });
  }, []);

  const tableRows = useMemo(
    () =>
      Object.entries(values).map(([key, value], index) => (
        <TableRow key={index}>
          <TableCell>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              value={key}
              onChange={(e) => handleLabelChange(key, e.target.value)}
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              type="number"
              inputProps={{ min: 0, max: 9999 }}
              value={value}
              onChange={(e) => handleValueChange(key, e.target.value)}
            />
          </TableCell>
          <TableCell align="center">
            <IconButton onClick={() => handleRemoveEntry(key)} color="error" disabled={index < 2}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )),
    [values, handleLabelChange, handleValueChange, handleRemoveEntry],
  );

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '70%' }}>
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Default Chart</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value as ChartType)}>
            {Object.values(ChartType).map((chartType) => (
              <MenuItem key={chartType} value={chartType}>
                {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={3} color={'text.secondary'}>
          Report Data:
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            mt: 1,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Label</strong>
                </TableCell>
                <TableCell>
                  <strong>Value</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
        <Box display={'flex'} justifyContent={'end'}>
          <Button
            size={'small'}
            onClick={handleAddEntry}
            variant="outlined"
            title={'Add row'}
            sx={{ mt: 1 / 2, display: 'flex-end', alignItems: 'center', gap: 1 }}
          >
            <AddCircleOutlineRoundedIcon /> Add row
          </Button>
        </Box>
      </Box>
      {(handleSave || handleCancel) && (
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          {handleCancel && (
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          {handleSave && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const sanitizedValues = Object.fromEntries(
                  Object.entries(values).map(([k, v]) => [k, v === '' ? 0 : v]),
                );
                handleSave({ id: data.id, question, values: sanitizedValues, type });
              }}
            >
              Save
            </Button>
          )}
        </Box>
      )}
    </>
  );
};
