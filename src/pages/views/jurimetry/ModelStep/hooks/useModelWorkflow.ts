import { useState, useEffect, useRef } from 'react';
import { useJurimetry } from '../../context/JurimetryHooks';
import { DefaultService } from '../../../../../client/services/DefaultService';
import { LLMModel } from '../../context/JurimetryContext';
import { useTranslation } from '../../../../../language';

export type LoadingState = 'IDLE' | 'STARTING' | 'PROCESSING' | 'CALCULATING' | 'READY' | 'ERROR';

export function useModelWorkflow() {
  const { t } = useTranslation();
  const { 
    setSelectedModel, 
    setCalculatedPrice,
    maxDocuments,
    enableMaxDocuments,
    terms,
    setPreProcessId
  } = useJurimetry();

  const [loadingState, setLoadingState] = useState<LoadingState>('IDLE');
  const [availableModels, setAvailableModels] = useState<LLMModel[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const runProcess = async () => {
      try {
        setLoadingState('STARTING');
        
        // 1. Start Pre-process
        const startResponse = await DefaultService.startPreProcess({
          searchTerm: terms,
          maxDocuments: (enableMaxDocuments && maxDocuments) ? parseInt(maxDocuments) : -1
        });

        if (!startResponse.preProcessId) {
            throw new Error(t("jurimetry.error.noPreProcessId"));
        }
        
        const pid = startResponse.preProcessId;
        setPreProcessId(pid);
        setLoadingState('PROCESSING');

        // 2. Poll for status
        const pollInterval = setInterval(async () => {
          try {
            const statusResponse = await DefaultService.getPreProcessStatus(pid);
            
            if (statusResponse.status === 'SUCCEEDED' || statusResponse.status === 'READY') {
              clearInterval(pollInterval);
              setLoadingState('CALCULATING');
              
              // 3. Calculate Price
              const priceResponse = await DefaultService.calculatePrice(pid);
              
              if (priceResponse.prices) {
                const models: LLMModel[] = priceResponse.prices.map(p => ({
                  id: p.modelId || 'unknown',
                  name: p.modelName || 'Unknown Model',
                  description: p.description || '',
                  price: p.estimatedPriceUsd || 0
                })).sort((a, b) => {
                  const isAFree = a.price === 0;
                  const isBFree = b.price === 0;

                  if (isAFree && !isBFree) return -1;
                  if (!isAFree && isBFree) return 1;
                  
                  return a.name.localeCompare(b.name);
                });

                setAvailableModels(models);
                
                // Select first model by default
                if (models.length > 0) {
                   const firstModel = models[0];
                   setSelectedModel(firstModel);
                   setCalculatedPrice(firstModel.price);
                }

                setLoadingState('READY');
              } else {
                throw new Error(t("jurimetry.error.noPrices"));
              }
            } else if (statusResponse.status === 'FAILED') {
              clearInterval(pollInterval);
              setLoadingState('ERROR');
              setErrorMessage(t("jurimetry.error.preprocessFailed"));
            }
          } catch (err) {
            clearInterval(pollInterval);
            setLoadingState('ERROR');
            setErrorMessage(t("jurimetry.error.statusCheckFailed"));
            console.error(err);
          }
        }, 2000);

      } catch (err) {
        setLoadingState('ERROR');
        setErrorMessage(t("jurimetry.error.startFailed"));
        console.error(err);
      }
    };

    runProcess();

  }, []); // Empty dependency array to run once on mount

  return {
    loadingState,
    availableModels,
    errorMessage
  };
}
