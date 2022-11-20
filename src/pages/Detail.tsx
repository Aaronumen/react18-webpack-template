import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDateTime } from '@/utills'
import {
  add,
  sub,
  addRandomList,
  deleteItem,
  asyncAdd
} from '@/store/reducers/demo'
import { RootState, AppDispatch } from '@/store'
import { Button } from 'antd'

const Detail = () => {
  const { id } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const { count, list } = useSelector((state: RootState) => state.demo)
  return (
    <>
      <h1>详情</h1>
      <h2>{count}</h2>
      <h1>{getDateTime()}</h1>
      <Button onClick={() => dispatch(add())}>add</Button>
      <Button onClick={() => dispatch(sub())}>sub</Button>
      <Button onClick={() => dispatch(addRandomList())}>addList</Button>
      <Button onClick={() => dispatch(asyncAdd())}>addList</Button>
      <ul>
        {list.map((item: string, index: number) => (
          <li key={item} onClick={() => dispatch(deleteItem(index))}>
            {item}
          </li>
        ))}
      </ul>
      <h1>{id}</h1>
    </>
  )
}
export default Detail
