import { brands } from 'Constants/ActionTypes';

const defaultState = {
  brands: [],
  createBrandLoading: false,
  createBrandErrorMessage: null,
  showCreateBrandModal: false,
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
    case brands.CREATE_BRAND_START: {
      return {
        ...state,
        createBrandLoading: true,
        createBrandErrorMessage: null,
      };
    }
    case brands.CREATE_BRAND_SUCCESS: {
      return {
        ...state,
        createBrandsLoading: false,
        brands: [...state.brands, action.payload],
      };
    }
    case brands.CREATE_BRAND_ERROR: {
      return {
        ...state,
        createBrandLoading: false,
        createBrandErrorMessage: action.payload,
      };
    }
    case brands.SHOW_CREATE_BRAND_MODAL: {
      return { ...state, showCreateBrandModal: true };
    }
    case brands.HIDE_CREATE_BRAND_MODAL: {
      return { ...state, showCreateBrandModal: false };
    }
    default: return state;
  }
};