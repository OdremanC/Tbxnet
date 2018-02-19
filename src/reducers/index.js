// Dependencies
import { combineReducers } from 'redux';

// Apps Reducers:

//USERS
import usersData from '../components/Users/reducer';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// Shared Reducers
import device from './deviceReducer';

const rootReducer = combineReducers({
  device,
  usersData,
  router: routerReducer
});

export default rootReducer;
