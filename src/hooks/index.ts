import {
  useState,
  useEffect,
  EffectCallback,
  DependencyList,
  useRef
} from 'react'

export function useLatest<T>(value: { current: T }) {
  const ref = useRef(value)
  return ref
}

export function useFirstMount(): boolean {
  const isFirst = useRef(true)
  if (isFirst.current) {
    isFirst.current = false
    return true
  }
  return isFirst.current
}

export function useMount(callback: EffectCallback) {
  useEffect(callback, [])
}

export function useUnMount(fn: { current: () => void }) {
  const fnRef = useLatest(fn)
  // @ts-ignore
  useEffect(() => () => fnRef.current(), [])
}

export const useDebounceEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  delay: number
) => {
  const [refreshFlag, setRefreshFlag] = useState(true) //用于更新effect
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useUpdateEffect(() => {
    timer.current = setTimeout(() => {
      setRefreshFlag(!refreshFlag)
    }, delay)
    return () => timer.current && clearTimeout(timer.current)
  }, [...deps])
  useUpdateEffect(effect, [refreshFlag])
}

export const useThrottleEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const [refreshFlag, setRefreshFlag] = useState(true)
  useUpdateEffect(() => {
    if (timer.current) return
    timer.current = setTimeout(() => {
      setRefreshFlag(!refreshFlag)
      timer.current = undefined
    }, delay)
    return () => timer.current && clearTimeout(timer.current)
  }, [...deps])
  useUpdateEffect(effect, [refreshFlag])
}

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMount() //判断是否是初次渲染
  useEffect(() => {
    if (!isFirstMount) {
      return effect() //二次渲染才执行
    }
  }, deps)
}

export function useSetState<T extends object>(initialState: T) {
  const [state, setState] = useState(initialState)
  const set = (value: Partial<T> | ((preState: T) => Partial<T>)): void => {
    setState({
      ...state,
      ...(value instanceof Function ? value(state) : value)
    })
  }
  return [state, set]
}
