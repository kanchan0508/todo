import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  taskState: taskReducer,
  authState: authReducer
});

// Enable Redux DevTools Extension with middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
