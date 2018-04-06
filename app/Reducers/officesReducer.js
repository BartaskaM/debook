import { offices } from 'Constants/ActionTypes';

const defaultState = {
  showAddOfficeModal: false,
};

export default (state = defaultState, action) => {
  switch (action.type){
    case offices.SHOW_ADD_OFFICE_MODAL: {
      return {...state, showAddOfficeModal: action.payload}; 
    }
    default: return state;
  }
};