import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { StoredReport } from '@/lib/types.ts';

interface ReportStore {
  reports: StoredReport[];
  addReports: (_newReports: StoredReport[]) => void;
  removeReport: (_id: string | string[]) => void;
  updateReport: (_id: string, _updatedReport: Partial<StoredReport>) => void;
  clearReports: () => void;
}

export const useReportStore = create<ReportStore>()(
  devtools(
    persist(
      (set) => ({
        reports: [], // Initial state
        addReports: (_newReports) =>
          set(
            (state) => ({
              reports: [...state.reports, ..._newReports],
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
      }),
      {
        name: 'report-storage', // LocalStorage key
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'Report Store' },
  ),
);
