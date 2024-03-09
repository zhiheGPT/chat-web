import axios from 'axios'
import { useAppStore } from '@/stores'

const instance = axios.create({
  headers: {},
  timeout: 300000
})

instance.interceptors.request.use((config) => {
  try {
    const appStore = useAppStore()
    config.headers['Authorization'] = `Bearer ${appStore.key}`
  } catch (error) { }
  return config
})


instance.interceptors.response.use(
  (res) => {
    let { data, code, msg } = res.data
    return data || res.data
    if (code === 0 || code === 200) {
      return data
    } else {
      return Promise.reject(res.data)
    }
  },
  (err) => {
    console.log('err', err)
    // 手动取消的请求，不做提示
    if (err?.code == 'ERR_CANCELED') {
      return Promise.reject()
    }
    $message.error('未知异常，请联系工程师。')
    return Promise.reject()
  }
)

export default instance
