import style from './VisualList.module.scss'
import { useState, useEffect, useRef, useTransition } from 'react'
import { useSetState } from '@/hooks'

const VisualList = () => {
  const [isPending, startTrasition] = useTransition()
  const [listMessage, setListMessage] = useState({
    start: 0,
    top: 0
  })
  const [scrollMessage, setScrollMessage] = useState({
    height: 2000,
    bottom: 0
  })
  const [listData, setListData] = useState(
    Array(100)
      .toString()
      .split(',')
      .map((item, index) => index)
  )
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const list = useRef<HTMLDivElement | undefined>()
  const scrollHandle = (e: any) => {
    if (timer.current) return
    //优化抖动和白屏效果，用requestAnimationFrame替代setTimeOut
    timer.current = requestAnimationFrame(() => {
      setListMessage({
        ...listMessage,
        start: Math.floor(e.target.scrollTop / 20),
        top: Math.floor(e.target.scrollTop)
      })
      if (
        e.target.clientHeight + e.target.scrollTop ===
        e.target.scrollHeight
      ) {
        setScrollMessage({
          ...scrollMessage,
          height: scrollMessage.height + 200,
          bottom: scrollMessage.bottom + 200
        })
        const newList = listData.concat(
          Array(20)
            .toString()
            .split(',')
            .map((item, index) => listData.length + index)
        )
        startTrasition(() => {
          setListData([...newList])
        })
      }
      cancelAnimationFrame(timer.current)
      timer.current = undefined
    })
  }
  return (
    <div className={style.infiniteListContainer}>
      <div className={style.warp} onScroll={scrollHandle}>
        <div
          ref={list}
          className={style.infiniteList}
          style={{
            paddingTop: listMessage.top,
            height: scrollMessage.height + 'px',
            bottom: scrollMessage.bottom + 'px'
          }}
        >
          {listData
            .slice(listMessage.start, listMessage.start + 24)
            .map(item => {
              return (
                <div key={item} className={style.item}>
                  {item}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default VisualList
