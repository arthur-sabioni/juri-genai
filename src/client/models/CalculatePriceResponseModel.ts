/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CalculatePriceResponseModel = {
    /**
     * Total size of processed PDFs in bytes.
     */
    totalPdfSize?: number;
    /**
     * Number of AI models available for processing.
     */
    modelsCount?: number;
    prices?: Array<{
        modelName?: string;
        modelId?: string;
        /**
         * Description of the model.
         */
        description?: string;
        estimatedPriceUsd?: number;
    }>;
    preProcessId?: string;
};

