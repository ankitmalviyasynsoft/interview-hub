'use client'

import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { api } from '@/redux/services/api.config'
import { rtkQueryLogger } from '@/redux/services/api.util'
import { layoutSlice } from '../slices/layout.slice'
import { authSlice } from '../slices/authSlice'

// Combine all reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
  [authSlice.name]: authSlice.reducer,
})

const persistConfig = { key: 'InterviewHub', storage, whitelist: ['layout', 'auth'] }
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware, rtkQueryLogger),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
