import { auth }from 'Constants/ActionTypes';

const defaultState = {
  user: {},
};

export default (state = defaultState, action) => {
  switch (action.type){
    case auth.SET_USER_INFO: {
      return {...state, user: action.payload};
    }
    case auth.LOG_OUT_USER: {
      return {...state, user: {}};
    }
    default: return state;
  }
};