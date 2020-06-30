import { useCallback } from "react";
import useApiActions from "./useApiActions";

import { PlaceholderService } from "./../utils/services";

function useApiService(inputs, Service = PlaceholderService) {
  const { state, actions: { LOADING, SUCCESS, FAILED }, dispatch, resetSave } = useApiActions();

  const handleSave = useCallback((argInputs) => new Service().makeRequest({...inputs, ...argInputs}, { LOADING, SUCCESS, FAILED }, dispatch), [
    inputs,
    Service,
    LOADING,
    SUCCESS,
    FAILED
  ]);

  return { state, handleSave, resetSave };
}

export default useApiService;
