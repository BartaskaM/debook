import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'Reducers/';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const store = createStore(reducer, devToolsEnhancer(), applyMiddleware(thunk));

export default store;