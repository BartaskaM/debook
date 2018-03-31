import * as at from 'Constants/ActionTypes';

const defaultState = {
  user: {},
};

export default (state = defaultState, action) => {
  switch (action.type){
    case at.auth.SET_USER_INFO: {
      return {...state, user: action.payload};
    }
    default: return state;
  }
};