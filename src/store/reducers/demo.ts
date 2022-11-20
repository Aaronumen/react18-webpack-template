import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../index'

interface demoData {
  list: string[]
  count: number
}

const initialState: demoData = {
  list: [],
  count: 0
}
const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    add: state => {
      state.count++
    },
    sub: state => {
      state.count--
    },
    addRandomList: state => {
      state.list.push(Math.random() * 20 + '')
    },
    deleteItem: (state, action) => {
      state.list.splice(action.payload, 1)
    }
  }
})
export const asyncAdd = () => {
  return async (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
export const { add, sub, addRandomList, deleteItem } = demoSlice.actions
export default demoSlice.reducer
