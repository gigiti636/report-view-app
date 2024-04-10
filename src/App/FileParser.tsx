import { Box, Typography } from '@mui/material';
import FileInput from '@/components/FileInput';
import { read, utils } from 'xlsx';
import type { GridColDef } from '@mui/x-data-grid';
import type { RowObject, EditorProps } from './models';

interface FIleParserProps {
  onFileParsed: (_data: EditorProps) => void;
}

export const FileParser = ({ onFileParsed }: FIleParserProps) => {
  const handleParseFile = async (file: File) => {
    try {
      if (file.size === 0) {
        alert('Please select');
      }

      const data = await file.arrayBuffer();
      const workbook = read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const result_raw = utils.sheet_to_json(firstSheet, {
        header: 1,
        raw: false,
        dateNF: 'dd/mm/yyyy',
      }) as never[][];

      const temp_cols: GridColDef[] = [];
      const temp_rows = [] as RowObject[];
      result_raw.map((dataRow, rowIndex) => {
        if (rowIndex === 0) {
          temp_cols.push({ field: 'id', headerName: 'id', width: 50, type: 'number' });
          dataRow.map((r, idx) => {
            temp_cols.push({
              field: `col${idx + 1}`,
              headerName: r,
              width: 300,
              editable: true,
              type: isNaN(r) ? 'string' : 'number',
            });
          });
        } else {
          const temp_row: RowObject = {
            id: rowIndex,
          };
          dataRow.map((r: string, idx) => {
            temp_row[`col${idx + 1}`] = r;
          });
          temp_rows.push(temp_row as RowObject);
        }
      });

      onFileParsed({ cols: temp_cols, rows: temp_rows });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box maxHeight={900} px={4} py={7}>
      <Box mt={10}>
        <Typography textAlign={'center'} mb={5} variant={'h6'}>
          Upload file for Edit & Preview
        </Typography>
        <FileInput
          accept={'.xlsx'}
          maxMbSize={2}
          onFileSelected={handleParseFile}
          sx={{ maxWidth: '400px', mx: 'auto' }}
        />
      </Box>
    </Box>
  );
};

export default FileParser;
