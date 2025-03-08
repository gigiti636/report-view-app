import type { GridColDef } from '@mui/x-data-grid';
import { Layout } from 'react-grid-layout';

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
  type: ChartType;
}

export type ReportData = Record<string, KeyTransformedData>;

export interface StoredReport extends KeyTransformedData {
  id: string;
  type: ChartType;
}

/* eslint-disable */
export enum ChartType {
  Bar = 'bar',
  Pie = 'pie',
  Donut = 'donut',
  Line = 'line',
}

/* eslint-enable */

export type DashboardType = {
  reports: StoredReport[];
  layout: Layout[];
};
