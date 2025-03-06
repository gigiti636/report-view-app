import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { StoredReport } from '@/lib/types.ts';

interface ReportStore {
  reports: StoredReport[];
  addReports: (_newReports: StoredReport[]) => void;
  removeReport: (_id: string) => void;
  updateReport: (_id: string, _updatedReport: Partial<StoredReport>) => void;
  clearReports: () => void;
}

export const useReportStore = create<ReportStore>()(
  devtools(
    // 🔥 Enable Redux DevTools
    persist(
      (set) => ({
        reports: [], // Initial state

        addReports: (_newReports) =>
          set(
            (state) => ({
              reports: [...state.reports, ..._newReports],
            }),
            false,
            'ADD_REPORTS', // 🔍 Action name for Redux DevTools
          ),

        removeReport: (_id) =>
          set(
            (state) => ({
              reports: state.reports.filter((report) => report.id !== _id),
            }),
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
    { name: 'Report Store' }, // 🔍 Custom store name in Redux DevTools
  ),
);
