import { IReport } from '@/types/IReport';
import { IMXResult } from '@/types/IMXResult';

export const loadReportsAction = (competitionId: string): void => {
    window.api.ipcRenderer.send('load-reports-request', competitionId);
};

export const handleLoadReportsAction = (competitionId: string): Promise<Array<IReport>> => {
    return window.api.ipcRenderer.invoke('handle-load-reports-request', competitionId);
};

export const reportInsertAction = (report: Omit<IReport, '_id'>): void => {
    window.api.ipcRenderer.send('report-insert-request', report);
};

export const reportUpdateAction = (_id: string, report: Omit<IReport, '_id' | 'competitionId'>): void => {
    window.api.ipcRenderer.send('report-update-request', _id, report);
};

export const reportDeleteAction = (_id: string): void => {
    window.api.ipcRenderer.send('report-delete-request', _id);
};

export const loadMXResultsAction = (date: number, time: number): Promise<Array<IMXResult>> => {
    return window.api.ipcRenderer.invoke('load-mx-results-request', date, time);
};
