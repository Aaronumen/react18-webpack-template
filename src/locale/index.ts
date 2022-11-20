import en_US from '../../public/local/en_US.json'
import zh_CN from '../../public/local/zh_CN.json'

const loadLocale = (lang: string) => {
  let locale = null
  let message = null
  switch (lang) {
    case 'en-US':
      locale = 'en-US'
      message = en_US
      break
    case 'zh-CN':
      locale = 'zh-CN'
      message = zh_CN
      break
    default:
      locale = 'zh-CN'
      message = zh_CN
      break
  }
  return { locale, message }
}

export { loadLocale }
