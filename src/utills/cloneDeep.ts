const cloneDeep = <T>(obj: T): any => {
  // @ts-ignore
  const cloneObj = new obj.constructor()
  if (obj === null) return null
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (typeof obj !== 'object') return obj
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = cloneDeep(obj[key])
    }
  }
  return cloneObj
}
export default cloneDeep
