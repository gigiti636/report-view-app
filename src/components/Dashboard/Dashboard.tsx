import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCallback, useState } from 'react';
import EditableText from '@/components/DataTableEditor/EditableText.tsx';
import { darken } from '@mui/material/styles';
import { deleteDraftStorage, hasDraftStorage, setDraftStorage, transformAndSplitDict } from '@/lib/utils.ts';
import { DRAFT_REPORT_KEY } from '@/lib/config.ts';

import Chart from './Chart.tsx';
import type { ReportColumn, TransformedData } from '@/lib/types.ts';

interface ReportsProps {
  transformedData: TransformedData;
}

export const Dashboard = ({ transformedData }: ReportsProps) => {
  const [reportData, setReportData] = useState<ReportColumn[]>(
    Object.values(transformedData).map((col, index) => {
      return {
        id: index + 1,
        question: col.question,
        values: col.values,
        open: true,
      };
    }),
  );

  const toggleExpandedReport = useCallback(
    (id: number) => {
      setReportData(
        reportData.map((col) => {
          return {
            ...col,
            open: id === col.id ? !col.open : col.open,
          };
        }),
      );
    },
    [reportData],
  );

  const bulkExpandedToggle = useCallback((to: 'open' | 'close') => {
    setReportData((currentData) => currentData.map((col) => ({ ...col, open: to === 'open' })));
  }, []);

  const handleEditSave = useCallback((id: number, new_text: string) => {
    setReportData((currentData) =>
      currentData.map((col) => (col.id === id ? { ...col, question: new_text } : col)),
    );
  }, []);

  const handleDiscardReport = useCallback((id: number) => {
    setReportData((currentData) => currentData.filter((report) => report.id !== id));
  }, []);

  const handleGroupID = useCallback((id: number) => {
    setReportData((currentData) =>
      currentData.map((r) => (r.id === id ? { ...r, values: transformAndSplitDict(r.values) } : r)),
    );
  }, []);

  return (
    <Box p={6}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Stack direction={'row'}>
          <Button onClick={() => bulkExpandedToggle('open')} disabled={reportData.every((r) => r.open)}>
            Open All
          </Button>
          <Button onClick={() => bulkExpandedToggle('close')} disabled={reportData.every((r) => !r.open)}>
            Close All
          </Button>
        </Stack>
        <Stack direction={'row'}>
          {hasDraftStorage(DRAFT_REPORT_KEY) && (
            <Button
              color={'secondary'}
              onClick={() => {
                deleteDraftStorage(DRAFT_REPORT_KEY);
                location.reload();
              }}
            >
              Clear
            </Button>
          )}

          <Button
            variant={'contained'}
            color={'secondary'}
            title={`${
              hasDraftStorage(DRAFT_REPORT_KEY) ? 'Update' : 'Save'
            } Report and come back to finish it later`}
            onClick={() => setDraftStorage(DRAFT_REPORT_KEY, reportData)}
          >
            {hasDraftStorage(DRAFT_REPORT_KEY) ? 'Update' : 'Save as'} Draft
          </Button>
        </Stack>
      </Box>
      {reportData.map((col, index) => (
        <Accordion
          key={index + '-' + col.values.question}
          sx={{ mb: 5, borderRadius: '12px' }}
          expanded={col.open}
        >
          <AccordionSummary
            onClick={() => toggleExpandedReport(col.id)}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`report-column-${index}`}
            id={`report-column-${index}`}
            sx={{ background: (theme) => darken(theme.palette.background.paper, 0.028) }}
          >
            <Box display={'flex'}>
              <EditableText id={col.id} text={col.question} onSave={handleEditSave} />
              <IconButton
                title={'Discard question'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDiscardReport(col.id);
                }}
                sx={{ mx: 1 }}
              >
                <DeleteForeverIcon color={'error'} />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{Object.keys(col.values).every((k) => k.includes(',')) ? 'test' : ''}</Typography>
            <Chart id={col.id} colData={col.values} handleGroupID={handleGroupID} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
