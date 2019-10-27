import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';
import { axiosInstance } from '../utils';

const reducer = combineReducers({
  home: homeReducer,
});

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

export default store;
