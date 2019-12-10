import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

const middleware = applyMiddleware(thunkMiddleware);
const initialState = {};

export default createStore(rootReducer, initialState, middleware);
