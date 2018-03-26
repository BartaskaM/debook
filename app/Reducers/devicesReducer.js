const defaultState = {
  devices: [],
  modelFilter: '',
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
    default: return state;
  }
};