import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'Reducers/';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, devToolsEnhancer(), middleware);

export default store;