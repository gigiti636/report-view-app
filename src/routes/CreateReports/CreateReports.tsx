import { Box } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { FileDataType, ReportData } from '@/lib/types.ts';

import { default as Header } from './CreateReportsHeader.tsx';
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
  [ViewModeType.DataEditor]: 'Edit Data: finish editing to view reports',
  [ViewModeType.Report]: 'Reports Page: preview and save!',
};

export function CreateReports() {
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
    <Box component={'main'}>
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
        <ReportsPreview transformedData={dataTransformed} />
      )}
    </Box>
  );
}
