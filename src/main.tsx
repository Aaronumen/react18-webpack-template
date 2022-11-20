import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import React, { lazy } from 'react'
import App from './App'

const Flex = React.lazy(() => import('@/pages/Flex'))
const Center = React.lazy(() => import('@/pages/Center'))
const Detail = lazy(() => import('@/pages/Detail'))
const DoubleColumn = lazy(() => import('@/pages/DoubleColumn'))
const ThreeColumn = lazy(() => import('@/pages/ThreeColumn'))
const TextOverflow = lazy(() => import('@/pages/textOverflow'))
const VisualList = lazy(() => import('@/pages/VisualList'))

const Main = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<App />} />
      <Route path="double" element={<DoubleColumn />} />
      <Route path="visualList" element={<VisualList />} />
      <Route path="three" element={<ThreeColumn />} />
      <Route path="text" element={<TextOverflow />} />
      <Route path="flex" element={<Flex />} />
      {/*嵌套路由的方式，配合<Outlet/> 来在父路由显示配套的子路由渲染的组件*/}
      <Route path="center" element={<Center />}>
        <Route path=":id" element={<Detail />} />
      </Route>
      {/*<Route path='center/:id' element={<Detail/>}/>*/}
    </Routes>
  </HashRouter>
)

export default Main
