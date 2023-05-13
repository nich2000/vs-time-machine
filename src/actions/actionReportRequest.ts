import { IReport } from '@/types/IReport';
import { IMXResult } from '@/types/IMXResult';
import { IMXSession } from '@/types/IMXSession';

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

export const loadMXSessionAction = (): Promise<Array<IMXSession>> => {
    return window.api.ipcRenderer.invoke('load-mx-sessions-request');
};

export const loadMXResultsAction = (sessionId: string): Promise<Array<IMXResult>> => {
    return window.api.ipcRenderer.invoke('load-mx-results-request', sessionId);
};
