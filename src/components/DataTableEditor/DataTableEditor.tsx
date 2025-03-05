import type { GridColumnMenuProps, GridToolbarProps } from '@mui/x-data-grid';
import {
  DataGrid,
  GridColumnMenu,
  gridRowsLookupSelector,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { CellDataRepetition, EditorProps, KeyTransformedData, TransformedData } from '@/lib/types.ts';

interface DataTableEditorProps {
  data: EditorProps;
  setTransformedData: (_data: TransformedData) => void;
}
export const DataTableEditor = ({ data, setTransformedData }: DataTableEditorProps) => {
  const ExtraColumnAction = (props: GridColumnMenuProps) => {
    return (
      <Box>
        <GridColumnMenu {...props} />
      </Box>
    );
  };

  const DataTransformerButton = () => {
    const apiRef = useGridApiContext();
    const rowsLookup = useGridSelector(apiRef, gridRowsLookupSelector);

    const transformData = () => {
      type KeyTreeType = Record<string, CellDataRepetition>;
      const values_tree: KeyTreeType = {};

      const COL_TO_EXCLUDE = 'id';
      Object.values(rowsLookup).forEach((row) => {
        Object.keys(row).forEach((key) => {
          // Skip the 'id' key and cells with empty string values
          if (key !== COL_TO_EXCLUDE && row[key] !== '') {
            const value = row[key];
            if (!values_tree.hasOwnProperty(key)) {
              // Initialize the nested object if it doesn't exist
              values_tree[key] = {};
            }
            if (!values_tree[key].hasOwnProperty(value)) {
              // Initialize the counter for this value if it doesn't exist
              values_tree[key][value] = 1;
            } else {
              // Increment the counter for this value
              values_tree[key][value]++;
            }
          }
        });
      });
      //console.log(values_tree);

      type QuestionTree = Record<string, string>;
      const question_tree: QuestionTree = {};

      data?.cols.forEach((col) => {
        if (col.field !== 'id') {
          question_tree[col.field] = col?.headerName ?? 'no text';
        }
      });
      //console.log(question_tree);

      const transformed_data: Record<string, KeyTransformedData> = {};
      Object.keys(values_tree).map((key) => {
        transformed_data[key] = {
          values: values_tree[key],
          question: question_tree[key],
        };
      });
      setTransformedData(transformed_data);
    };

    return (
      <Button color="secondary" size={'large'} variant={'contained'} onClick={transformData} sx={{ my: 2 }}>
        Finish Editing
      </Button>
    );
  };

  const CustomToolbar = (props: GridToolbarProps) => {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        my={1 / 2}
        flexWrap={'wrap'}
        gap={1}
        justifyContent={'space-between'}
      >
        <GridToolbar {...props} />
        <DataTransformerButton />
      </Box>
    );
  };

  return (
    <Box p={2} height={'85vh'} overflow={'auto'}>
      <DataGrid
        rows={data?.rows}
        columns={data?.cols.map((col) => ({
          ...col,
          renderCell: (params) => {
            const is_empty = !params.value || String(params.value).trim().length === 0;
            return (
              <Box bgcolor={is_empty ? 'warning.main' : 'inherit'} textAlign={'left'}>
                <Typography
                  sx={{
                    display: 'unset',
                    color: is_empty ? 'common.white' : '',
                  }}
                >
                  {is_empty ? 'Cell will be ignored' : params.value}
                </Typography>
              </Box>
            );
          },
        }))}
        sx={{
          p: 3 / 2,
          borderRadius: '10px',
          background: (theme) => theme.palette.background.paper,
          '& .MuiDataGrid-columnHeader': {
            bgcolor: 'primary.main',
            color: 'white',
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell--editing': {
            boxShadow: 'none',
          },
        }}
        columnHeaderHeight={40}
        slots={{
          toolbar: CustomToolbar,
          columnMenu: ExtraColumnAction,
        }}
        disableRowSelectionOnClick={true}
      />
    </Box>
  );
};
