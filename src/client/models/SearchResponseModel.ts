/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SearchResponseModel = {
    /**
     * Total number of documents found.
     */
    numFound?: number;
    results?: Array<{
        score?: number;
        title?: string;
        url?: string;
    }>;
};

