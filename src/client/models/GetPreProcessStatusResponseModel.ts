/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetPreProcessStatusResponseModel = {
    /**
     * Number of documents processed so far.
     */
    documentCount?: number;
    createdAt?: string;
    searchTerm?: string;
    preProcessId?: string;
    /**
     * Current status of the pre-process job (e.g., RUNNING, SUCCEEDED, FAILED).
     */
    status?: string;
};

