import React                            from 'react';
import { Router }                       from 'react-router';
import { history }                      from 'react-router/lib/BrowserHistory';
import routes                           from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';
import { applyMiddleware }              from 'redux';
import promiseMiddleware                from 'lib/promiseMiddleware';

let initialState = window.__INITIAL_STATE__;

// Transform into Imutable.js collections,
// but leave top level keys untouched for Redux
Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
