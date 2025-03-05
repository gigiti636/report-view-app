import { Box } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import MainHeader from './MainHeader.tsx';
import { FileParser, DataTableEditor, Report } from '@/components';
import { EditorProps, TransformedData } from '@/lib/types.ts';

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
  [ViewModeType.Report]: 'Reports Page: save reports to create dashboards',
};

export function Main() {
  const [data, setData] = useState<EditorProps | null>(null);
  const [dataTransformed, setDataTransformed] = useState<TransformedData | null>(null);

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
      <MainHeader
        title={titleMapping[viewMode]}
        showPrevStep={viewMode !== ViewModeType.FileParser}
        goPrevious={handlerHeaderBack}
      />

      {viewMode === ViewModeType.FileParser && <FileParser onFileParsed={(data) => setData(data)} />}

      {viewMode === ViewModeType.DataEditor && data && (
        <DataTableEditor
          data={data}
          setTransformedData={(data: TransformedData) => setDataTransformed(data)}
        />
      )}

      {dataTransformed && viewMode === ViewModeType.Report && <Report transformedData={dataTransformed} />}
    </Box>
  );
}
