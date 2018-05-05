import { models } from 'Constants/ActionTypes';

const defaultState = {
  models: [],

  fetchModelsLoading: false,
  fetchModelsErrorMessage: null,

  createModelLoading: false,
  createModelErrorMessage: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case models.FETCH_MODELS_START: {
      return {
        ...state,
        fetchModelsLoading: true,
        fetchModelsErrorMessage: null,
      };
    }
    case models.FETCH_MODELS_SUCCESS: {
      return {
        ...state,
        fetchModelsLoading: false,
        models: action.payload,
      };
    }
    case models.FETCH_MODELS_ERROR: {
      return {
        ...state,
        fetchModelsLoading: false,
        fetchModelsErrorMessage: action.payload,
      };
    }

    case models.CREATE_MODEL_START: {
      return {
        ...state,
        createModelLoading: true,
        createModelErrorMessage: null,
      };
    }
    case models.CREATE_MODEL_SUCCESS: {
      return {
        ...state,
        createModelLoading: false,
        offices: [...state.models, action.payload],
      };
    }
    case models.CREATE_MODEL_ERROR: {
      return {
        ...state,
        createModelLoading: false,
        createModelErrorMessage: action.payload,
      };
    }
    
    default: return state;
  }
};