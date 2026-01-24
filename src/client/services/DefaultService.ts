/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalculatePriceResponseModel } from '../models/CalculatePriceResponseModel';
import type { GetPreProcessStatusResponseModel } from '../models/GetPreProcessStatusResponseModel';
import type { SearchResponseModel } from '../models/SearchResponseModel';
import type { StartPreProcessModel } from '../models/StartPreProcessModel';
import type { StartPreProcessResponseModel } from '../models/StartPreProcessResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns void
     * @throws ApiError
     */
    public static optionsPreProcessStatus(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/pre-process/status',
        });
    }
    /**
     * @param requestBody
     * @returns StartPreProcessResponseModel 200 response
     * @throws ApiError
     */
    public static startPreProcess(
        requestBody: StartPreProcessModel,
    ): CancelablePromise<StartPreProcessResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pre-process',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static optionsPreProcess(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/pre-process',
        });
    }
    /**
     * @param preProcessId
     * @returns CalculatePriceResponseModel 200 response
     * @throws ApiError
     */
    public static calculatePrice(
        preProcessId: string,
    ): CancelablePromise<CalculatePriceResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calculate-price',
            query: {
                'preProcessId': preProcessId,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static optionsCalculatePrice(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/calculate-price',
        });
    }
    /**
     * @param searchTerm
     * @returns SearchResponseModel 200 response
     * @throws ApiError
     */
    public static search(
        searchTerm: string,
    ): CancelablePromise<SearchResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search',
            query: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static optionsSearch(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/search',
        });
    }
    /**
     * @param preProcessId
     * @returns GetPreProcessStatusResponseModel 200 response
     * @throws ApiError
     */
    public static getPreProcessStatus(
        preProcessId: string,
    ): CancelablePromise<GetPreProcessStatusResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pre-process/status/{preProcessId}',
            path: {
                'preProcessId': preProcessId,
            },
        });
    }
    /**
     * @param preProcessId
     * @returns void
     * @throws ApiError
     */
    public static optionsPreProcessStatus1(
        preProcessId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/pre-process/status/{preProcessId}',
            path: {
                'preProcessId': preProcessId,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static options(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/',
        });
    }
}
