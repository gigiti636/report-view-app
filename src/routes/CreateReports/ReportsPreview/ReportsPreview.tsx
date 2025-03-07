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
import { darken } from '@mui/material/styles';
import { transformAndSplitDict } from '@/lib/utils.ts';
import { EditableText, Modal } from '@/components';

import Chart from './ChartControl.tsx';
import type { ReportColumn, ReportData, StoredReport } from '@/lib/types.ts';
import { nanoid } from 'nanoid';
import { useReportStore } from '@/lib/reports.store.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/AppRouter.tsx';

interface ReportsProps {
  transformedData: ReportData;
  handleClear: () => void;
}

export const ReportsPreview = ({ transformedData, handleClear }: ReportsProps) => {
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

  const [reportIdToDelete, setReportIdsToDelete] = useState<number | null>(null);

  const [showInsertedModal, setShowInsertedModal] = useState(false);

  const { addReports } = useReportStore();

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

  const handleDiscardReport = useCallback(() => {
    if (reportIdToDelete) {
      setReportData((currentData) => currentData.filter((report) => report.id !== reportIdToDelete));
      setReportIdsToDelete(null);
    }
  }, [reportIdToDelete]);

  const handleGroupID = useCallback((id: number) => {
    setReportData((currentData) =>
      currentData.map((r) => (r.id === id ? { ...r, values: transformAndSplitDict(r.values) } : r)),
    );
  }, []);

  const handleSaveReports = () => {
    const reportDataToSave = reportData.map((report) => {
      return { id: nanoid(), question: report.question, values: report.values } as StoredReport;
    });

    addReports(reportDataToSave);
    setShowInsertedModal(true);
  };

  const navigate = useNavigate();

  return (
    <>
      <Box p={5}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Stack direction={'row'}>
            <Button onClick={() => bulkExpandedToggle('open')} disabled={reportData.every((r) => r.open)}>
              Expand All
            </Button>
            <Button onClick={() => bulkExpandedToggle('close')} disabled={reportData.every((r) => !r.open)}>
              Collapse All
            </Button>
          </Stack>
          <Button onClick={handleSaveReports} variant={'contained'} color={'secondary'}>
            Save All Reports
          </Button>
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
              <Box display={'flex'} alignItems={'center'}>
                <EditableText text={col.question} onSave={(text) => handleEditSave(col.id, text)} />
                <IconButton
                  title={'Discard question'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReportIdsToDelete(col.id);
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

      <Modal
        open={showInsertedModal}
        header={'Reports have been saved!'}
        callToActionLabel={'Go to Reports Page'}
        callToAction={() => navigate(routes.reports)}
        cancelActionLabel={'Insert new file'}
        cancelAction={handleClear}
      >
        How you want to proceed ?
      </Modal>

      <Modal
        header={'Delete Report'}
        open={Boolean(reportIdToDelete)}
        onClose={() => setReportIdsToDelete(null)}
        closeModal={() => setReportIdsToDelete(null)}
        callToActionIsDelete={true}
        callToActionLabel={'Delete'}
        callToAction={handleDiscardReport}
      >
        Are you sure you want to disregard this report from reports?
      </Modal>
    </>
  );
};
