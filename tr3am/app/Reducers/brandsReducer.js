import { brands } from 'Constants/ActionTypes';

const defaultState = {
  brands: [],

  fetchBrandsLoading: false,
  fetchBrandsErrorMessage: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case brands.FETCH_BRANDS_START: {
      return {
        ...state,
        fetchBrandsLoading: true,
        fetchBrandsErrorMessage: '',
      };
    }
    case brands.FETCH_BRANDS_SUCCESS: {
      return {
        ...state,
        fetchBrandsLoading: false,
        brands: action.payload,
      };
    }
    case brands.FETCH_BRANDS_ERROR: {
      return {
        ...state,
        fetchBrandsLoading: false,
        fetchBrandsErrorMessage: action.payload,
      };
    }
    default: return state;
  }
};