// Dependencies
import { combineReducers } from 'redux';

// Apps Reducers:

//USERS
import usersData from '../components/Users/reducer';

//PERFILES
import perfileReducer from '../components/Perfiles/reducer';

//MENU
import sectionsReducer from '../components/Secciones/reducer';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// Shared Reducers
import device from './deviceReducer';

const rootReducer = combineReducers({
  device,
  sectionsReducer,
  usersData,
  perfileReducer,
  router: routerReducer
});

export default rootReducer;
