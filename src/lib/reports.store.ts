import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import { DashboardType, StoredReport } from '@/lib/types.ts';
import type { Layout } from 'react-grid-layout';

interface ReportStore {
  reports: StoredReport[];
  dashboard: { layout: Layout[]; reports: StoredReport[] } | null;
  addReports: (_newReports: StoredReport[]) => void;
  removeReport: (_id: string | string[]) => void;
  updateReport: (_id: string, _updatedReport: Partial<StoredReport>) => void;
  clearReports: () => void;
  addDashboard: (_dashboard: DashboardType) => void;
  updateDashboard: (_updatedDashboard: Partial<DashboardType>) => void;
  clearDashboard: () => void;
}

export const useReportStore = create<ReportStore>()(
  devtools(
    persist(
      (set) => ({
        reports: [],
        dashboard: null,

        addReports: (_newReports) =>
          set(
            (state) => ({
              reports: [..._newReports, ...state.reports],
            }),
            false,
            'ADD_REPORTS',
          ),

        removeReport: (_id) =>
          set(
            (state) => {
              const idsToRemove = Array.isArray(_id) ? new Set(_id) : new Set([_id]);
              return {
                reports: state.reports.filter((report) => !idsToRemove.has(report.id)),
              };
            },
            false,
            'REMOVE_REPORT',
          ),

        updateReport: (_id, _updatedReport) =>
          set(
            (state) => ({
              reports: state.reports.map((report) =>
                report.id === _id ? { ...report, ..._updatedReport } : report,
              ),
            }),
            false,
            'UPDATE_REPORT',
          ),

        clearReports: () => set({ reports: [] }, false, 'CLEAR_REPORTS'),

        addDashboard: (_dashboard) =>
          set(
            () => ({
              dashboard: { layout: _dashboard.layout, reports: _dashboard.reports },
            }),
            false,
            'ADD_DASHBOARD',
          ),

        updateDashboard: (_updatedDashboard) =>
          set(
            (state) => ({
              dashboard: state.dashboard ? { ...state.dashboard, ..._updatedDashboard } : null,
            }),
            false,
            'UPDATE_DASHBOARD',
          ),

        clearDashboard: () =>
          set(
            () => ({
              dashboard: null,
            }),
            false,
            'CLEAR_DASHBOARD',
          ),
      }),
      {
        name: 'report-storage', // LocalStorage key
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'Report Store' },
  ),
);
