import { Box, Paper } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { FileDataType, ReportData } from '@/lib/types.ts';

import { default as Header } from './InsertReportsHeader.tsx';
import { FileParser } from './FileParser';
import { DataTableEditor } from './DataTableEditor';
import { ReportsPreview } from './ReportsPreview';

/* eslint-disable */
export enum ViewModeType {
  FileParser = 'file-parse',
  DataEditor = 'data-edit',
  Report = 'report-edit',
}
/* eslint-enable */

export const titleMapping: Record<ViewModeType, string> = {
  [ViewModeType.FileParser]: 'Upload xlsx file to begin!',
  [ViewModeType.DataEditor]: 'Edit Data',
  [ViewModeType.Report]: 'Preview and save!',
};

export function InsertReports() {
  const [data, setData] = useState<FileDataType | null>(null);
  const [dataTransformed, setDataTransformed] = useState<ReportData | null>(null);

  const viewMode = useMemo<ViewModeType>(() => {
    if (!data) {
      return ViewModeType.FileParser;
    } else if (!dataTransformed) {
      return ViewModeType.DataEditor;
    } else {
      return ViewModeType.Report;
    }
  }, [data, dataTransformed]);

  const handlerHeaderBack = useCallback(() => {
    if (viewMode === ViewModeType.Report) {
      setDataTransformed(null);
    } else if (viewMode === ViewModeType.DataEditor) {
      setData(null);
    }
  }, [viewMode]);

  return (
    <Box p={2} bgcolor={'background.default'}>
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: 2,
        }}
      >
        <Header
          title={titleMapping[viewMode]}
          showPrevStep={viewMode !== ViewModeType.FileParser}
          goPrevious={handlerHeaderBack}
        />

        {viewMode === ViewModeType.FileParser && <FileParser onFileParsed={(data) => setData(data)} />}

        {viewMode === ViewModeType.DataEditor && data && (
          <DataTableEditor data={data} setTransformedData={(data: ReportData) => setDataTransformed(data)} />
        )}

        {dataTransformed && viewMode === ViewModeType.Report && (
          <ReportsPreview
            transformedData={dataTransformed}
            handleClear={() => {
              setDataTransformed(null);
              setData(null);
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
