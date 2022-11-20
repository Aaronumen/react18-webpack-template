import React from 'react'
import Main from './main'
import './style/style.scss'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@/store'

const container = document.getElementById('app')
// @ts-ignore
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
)
