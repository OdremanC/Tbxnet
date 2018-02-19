// Dependencies
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
export const history = createHistory();


//middleware de redux, para despachar los actions e inyecta el isomorphic
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

export default function configureStore(options, rootReducer) {
  const { initialState = {} } = options;


  const middleware = [
    injectMiddleware({
      fetch: isomorphicFetch
    }),
    //ayuda a manejas las promises agregadole sufijos
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    reduxImmutableStateInvariant(),
    
    createLogger(),
    routerMiddleware(history)
    
  ];

  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
