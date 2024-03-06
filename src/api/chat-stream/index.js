import { hosts } from '@/config/host'
import { useAppStore } from '@/stores'

function getHeaders() {
  const appStore = useAppStore()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${appStore.key}`
  }
}

// gpt 问答
export const chat2gpt = async (data) => {
  return fetch(`${hosts.chat}/v1/chat/completions`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: getHeaders()
  })

}

// 文件问答
export const chat2File = async (data) => {
  // return fetch(`${hosts.chat}/v1/chat/completions`, {
  //   method: 'post',
  //   body: JSON.stringify(data),
  //   headers: getHeaders()
  // })
}