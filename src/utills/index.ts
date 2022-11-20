export function cloneDeep(obj: any) {
  const deepObject = new obj.constructor()
  if (typeof obj === null) return null
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj !== 'object') return obj
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      deepObject[key] = cloneDeep(obj[key])
    }
  }
  return deepObject
}

export function _new(fn: () => any, ...args: any[]) {
  if (!(fn instanceof Function)) {
    throw new Error(`${fn} is not a function`)
  }
  const newObj: object = {}
  // @ts-ignore
  newObj.__proto__ = fn.prototype
  // @ts-ignore
  const res = fn.apply(newObj, [...args])
  return (typeof res === 'object' && res !== null) || typeof res === 'function'
    ? fn()
    : newObj
}

export function getDateTime(): string {
  const data = new Date(),
    year = data.getFullYear(),
    month =
      data.getMonth() + 1 < 10
        ? '0' + (data.getMonth() + 1)
        : data.getMonth() + 1,
    day = data.getDay() < 10 ? '0' + data.getDay() : data.getDay(),
    hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours(),
    minute =
      data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes(),
    second =
      data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


export function deepClone<T>(obj: any) {
  let deepObject = new obj.constructor();
  if (typeof obj === null) return null;
  if (typeof obj === 'object') return obj;
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      deepObject[key] = deepClone(obj[key])
    }
  }
  return deepObject
}

export function TypeOf(L, R) {
  let typeL = L.__proto__, typeR = R.prototype;
  while (true) {
    if (typeL === null) return false
    if (typeL === typeR) return true
    typeL = typeL.__proto__
  }
}
