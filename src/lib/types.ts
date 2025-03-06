import type { GridColDef } from '@mui/x-data-grid';

export type RowObject = {
  id: number;
  [key: `col${number}`]: string;
};

export type FileDataType = { cols: GridColDef[]; rows: RowObject[] };

export type KeyTransformedData = {
  question: string;
  values: CellDataRepetition;
};
export type CellDataRepetition = Record<string, number>;

export interface ReportColumn extends KeyTransformedData {
  id: number;
  open: boolean;
}

export type ReportData = Record<string, KeyTransformedData>;
