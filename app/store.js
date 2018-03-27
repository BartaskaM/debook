import { createStore } from 'redux';
import reducer from './reducers/rootReducer';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

export default createStore(reducer, devToolsEnhancer());