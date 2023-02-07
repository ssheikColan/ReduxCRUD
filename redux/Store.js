import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import RegisterReducer from './reducer/RegisterReducer';
import logger from 'redux-logger';

const rootReducer = combineReducers({
    register : RegisterReducer,
})

let composedEnhancer = compose(applyMiddleware(logger, thunk));

export const Store = createStore(rootReducer, {}, composedEnhancer);