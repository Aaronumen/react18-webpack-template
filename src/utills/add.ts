const add = (...x: number[]) => {
  let result = x.reduce((cur: number, pre: number) => cur + pre)
  const s = (...y: number[]): any => {
    y.reduce((cur: number, pre: number) => {
      return (result = cur + pre)
    }, result)
    return s
  }
  s.toString = () => {
    return x
  }
  return s
}
export default add
