import type { GridColDef } from '@mui/x-data-grid';

export interface RowObject {
  id: number;
  [key: `col${number}`]: string;
}

export type EditorProps = { cols: GridColDef[]; rows: RowObject[] };

export type TransformedData = Record<string, KeyTransformedData>;

export type KeyTransformedData = {
  question: string;
  values: CellDataRepetition;
};
export type CellDataRepetition = Record<string, number>;

/* eslint-disable */
export enum ViewModeType {
  FileParser = 'file-parse',
  DataEditor = 'data-edit',
  Report = 'report-edit',
}

export const titleMapping: Record<ViewModeType, string> = {
  [ViewModeType.FileParser]: 'Upload',
  [ViewModeType.DataEditor]: 'Edit Data',
  [ViewModeType.Report]: 'Report Page',
};
/* eslint-enable */

export interface ReportColumn extends KeyTransformedData {
  id: number;
  open: boolean;
}

export const DRAFT_REPORT_KEY = 'draft-report';
