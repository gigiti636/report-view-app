import { Box } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import Header from '@/App/Header';
import FileParser from './FileParser';
import DataEditor from './DataEditor';
import Index from './EditReport';
import { EditorProps, titleMapping, TransformedData, ViewModeType, DRAFT_REPORT_KEY } from './models';
import { hasDraftStorage, getDraftStorage } from '@/util';

function App() {
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
    <Box height={'100%'} component={'main'}>
      <Header
        title={titleMapping[viewMode]}
        showPrevStep={viewMode !== ViewModeType.FileParser}
        goPrevious={handlerHeaderBack}
        hasDraft={hasDraftStorage(DRAFT_REPORT_KEY)}
      />

      {viewMode === ViewModeType.FileParser && <FileParser onFileParsed={(data) => setData(data)} />}

      {viewMode === ViewModeType.DataEditor && (
        <DataEditor data={data} setTransformedData={(data: TransformedData) => setDataTransformed(data)} />
      )}

      {dataTransformed && viewMode === ViewModeType.Report && <Index transformedData={dataTransformed} />}
    </Box>
  );
}

export default App;
