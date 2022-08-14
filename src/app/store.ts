import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
  userSlice,
  userSliceReqres,
} from '../features/authentication/services/userSlice'
import counterReducer from '../features/counter/counterSlice'
import { apiSlice } from '../features/movies/services/apiSlice'
import { docsApi } from '../services/docs/docs'

import { rtkQueryErrorHandler } from './middleware'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkQueryErrorHandler)
      .concat(docsApi.middleware)
      .concat(apiSlice.middleware)
      .concat(userSlice.middleware)
      .concat(userSliceReqres.middleware),
  reducer: {
    counter: counterReducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [userSliceReqres.reducerPath]: userSliceReqres.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
