import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './AuthReducer';
import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    auth: AuthReducer,
});

const middleware = [thunk];

const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;