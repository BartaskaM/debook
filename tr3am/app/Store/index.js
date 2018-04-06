import { createStore } from 'redux';
import reducer from 'Reducers/';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const store = createStore(reducer, devToolsEnhancer());

export default store;