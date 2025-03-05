import { Box } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import MainHeader from './MainHeader.tsx';
import { FileParser, DataTableEditor, Dashboard } from '@/components';
import { EditorProps, TransformedData } from '@/lib/types.ts';
import { hasDraftStorage, getDraftStorage } from '@/lib/utils.ts';
import { DRAFT_REPORT_KEY } from '@/lib/config.ts';

/* eslint-disable */
export enum ViewModeType {
  FileParser = 'file-parse',
  DataEditor = 'data-edit',
  Report = 'report-edit',
}
/* eslint-enable */

export const titleMapping: Record<ViewModeType, string> = {
  [ViewModeType.FileParser]: 'Upload xlsx or csv file to begin!',
  [ViewModeType.DataEditor]: 'Edit Data',
  [ViewModeType.Report]: 'Report Page',
};

export function Main() {
  const [data, setData] = useState<EditorProps | null>(null);
  const [dataTransformed, setDataTransformed] = useState<TransformedData | null>(
    getDraftStorage(DRAFT_REPORT_KEY) as TransformedData,
  );

  const viewMode = useMemo<ViewModeType>(() => {
    if (hasDraftStorage(DRAFT_REPORT_KEY)) {
      return ViewModeType.Report;
    } else if (!data) {
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
        hasDraft={hasDraftStorage(DRAFT_REPORT_KEY)}
      />

      {viewMode === ViewModeType.FileParser && <FileParser onFileParsed={(data) => setData(data)} />}

      {viewMode === ViewModeType.DataEditor && data && (
        <DataTableEditor
          data={data}
          setTransformedData={(data: TransformedData) => setDataTransformed(data)}
        />
      )}

      {dataTransformed && viewMode === ViewModeType.Report && <Dashboard transformedData={dataTransformed} />}
    </Box>
  );
}
