import { configureStore, createSlice } from '@reduxjs/toolkit'
import demo from './reducers/demo'

const store = configureStore({
  reducer: {
    demo
  }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
