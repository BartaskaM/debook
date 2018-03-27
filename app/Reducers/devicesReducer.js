const defaultState = {
  devices: [],
  modelFilter: '',
  brandFilter: [],
};

export default (state = defaultState, action) => {
  switch (action.type){
    case 'ADD_DEVICE': {
      return {...state, devices: [...state.devices, action.payload]};
    }
    case 'SET_MODEL_FILTER': {
      return {...state, modelFilter: action.payload};
    }
    case 'SET_DEVICES':{
      return {...state, devices: [...action.payload]};
    }
    case 'ADD_BRAND_FILTER': {
      return {...state, brandFilter: [...state.brandFilter,action.payload]};
    }
    case 'REMOVE_BRAND_FILTER': {
      const newBrands = state.brandFilter.splice(action.payload);
      return {...state, brandFilter: newBrands};
    }
    default: return state;
  }
};