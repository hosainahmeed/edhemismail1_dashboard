import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApis'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
})