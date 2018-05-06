import { brands } from 'Constants/ActionTypes';

const defaultState = {
  brands: [],

  fetchBrandsLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case brands.FETCH_BRANDS_START: {
      return {
        ...state,
        fetchBrandsLoading: true,
      };
    }
    case brands.FETCH_BRANDS_SUCCESS: {
      return {
        ...state,
        fetchBrandsLoading: false,
        brands: action.payload,
      };
    }
    default: return state;
  }
};