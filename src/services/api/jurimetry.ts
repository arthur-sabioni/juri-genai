import { jurimetryApi } from "./client";

export type StartPreProcessResponse = {
  preProcessId?: string;
  status?: string;
  [key: string]: unknown;
};

type StartPreProcessPayload = {
  searchTerm: string;
  maxDocuments?: number;
};

export type PreProcessStatusResponse = {
  status?: string;
  documentCount?: number;
  [key: string]: unknown;
};

export const jurimetryService = {
  startPreProcess: async (searchTerm: string, maxDocuments?: number) => {
    const payload: StartPreProcessPayload = { searchTerm };

    if (typeof maxDocuments === "number" && Number.isFinite(maxDocuments)) {
      payload.maxDocuments = maxDocuments;
    }

    return jurimetryApi.post<StartPreProcessResponse>("pre-process", payload);
  },
  getPreProcessStatus: async (preProcessId: string) => {
    return jurimetryApi.get<PreProcessStatusResponse>(
      `pre-process/status/${encodeURIComponent(preProcessId)}`
    );
  },
};
