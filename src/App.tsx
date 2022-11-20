import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useUpdateEffect,
  useDebounceEffect,
  useThrottleEffect,
  useSetState
} from '@/hooks'
import { Button, ConfigProvider, DatePicker, Input } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import en_GB from 'antd/lib/locale/en_GB'
import { IntlProvider } from 'react-intl'
import { loadLocale } from './locale/index'
import { FormattedMessage } from 'react-intl'
import { _Promise, _Promise1, creatLazyMan, _instanceof } from './utills/promise'
const App = () => {
  const [num, setNum] = useState(0)
  const [language, setLanguage] = useState('zh-CN')
  const { locale, message } = loadLocale(language)
  const [inputValue, setInputValue] = useState('')
  const [param, setParam] = useSetState({ name: 'sun', age: 18 })
  useEffect(() => {
    // let promise = new _Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve('hello');
    //   }, 1000)
    // });
    // // T0 + 0.0000001s
    // promise.then((data) => {
    //   console.log(data);
    //   return data + 'sunyi'
    // }).then(data => {
    //   console.log(data + 'lkk');
    // })

    creatLazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
    console.log('instanceof', _instanceof({}, Object))
  })
  useUpdateEffect(() => {
    console.log('num', num, 'param', param)
    return () => console.log('ccc')
  }, [num, param])
  //防抖input框
  // useDebounceEffect(() => {
  //     console.log('inputValue', inputValue)
  // }, [inputValue], 2000)
  //节流input框
  useThrottleEffect(
    () => {
      console.log('inputValue', inputValue)
    },
    [inputValue],
    2000
  )
  const Navigate = useNavigate()
  const changeEn_US = () => {
    setLanguage('en-US')
  }
  const changeZH_CN = () => {
    setLanguage('zh-CN')
  }
  const InputChange = (value: any) => {
    setInputValue(value.target.value)
  }
  const changeParam = () => {
    // @ts-ignore
    setParam({ age: 19 })
  }
  return (
    <IntlProvider locale={locale} messages={message}>
      <ConfigProvider locale={language === 'zh-CN' ? zhCN : en_GB}>
        <Button onClick={changeParam}>改变param</Button>
        <Button onClick={changeZH_CN}>中文</Button>
        <Button onClick={changeEn_US}>英文</Button>
        {/*replace属性决定浏览器是否保存记录,true为保存,反之不保存*/}
        <Button onClick={() => Navigate(`/flex`, { replace: false })}>
          跳转flex
        </Button>
        <Button onClick={() => Navigate(`/center/3`, { replace: true })}>
          跳转detail
        </Button>
        <Input onChange={InputChange} value={inputValue} />
        <DatePicker />
        <h1>
          <FormattedMessage id="home" />
        </h1>
        <p>
          <FormattedMessage id="home" />
        </p>
      </ConfigProvider>
    </IntlProvider>
  )
}

export default App
