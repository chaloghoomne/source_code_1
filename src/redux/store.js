'use client'; // Required for client-side Redux

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { persistedReducer } from '../redux/rootReducer';
import { thunk } from 'redux-thunk';
import {logger} from 'redux-logger';

// Create the Redux store
export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
);

// Persist the store
export const persistor = persistStore(store);
