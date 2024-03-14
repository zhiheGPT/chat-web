import { ref } from 'vue'
import { chat2gpt } from '@/api'
import { positionDomViewBottom } from '@/utils'

export const useSend = (messages) => {
  const running = ref(false)
  const content = ref('')
  let controller = new AbortController()
  const send = async (data) => {
    // 发送之前进行套餐校验
    controller = new AbortController()
    running.value = true
    return chat2gpt(data, { signal: controller.signal })
      .then(async (res) => {
        if (res.status == 200) {
          await readerStream(res)
        } else {
          throw Error(res)
        }
      })
      .catch((err) => {
        $messages.error(err)
      })
      .finally(() => {
        running.value = false
        content.value = ''
      })
  }

  // 文件流处理
  const readerStream = async (res) => {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = res.body.getReader()
        while (true) {
          const { value, done } = await reader.read()
          let decodeVal = new TextDecoder().decode(value)
          console.log('decodeVal', decodeVal);
          // TODO 异常直接终止
          if (done) break
          content.value += getVal(decodeVal)
        }
        resolve()
      } catch (error) {
        if (error.name === 'AbortError') {
          resolve()
        } else {
          console.log(error);
          reject(error)
        }
      }
    })
  }

  const handleStop = () => {
    if (running.value) {
      controller.abort()
      running.value = false
    }
  }
  return {
    content,
    running,
    send,
    handleStop
  }
}

function getVal(val) {
  let content = ''
  try {
    const list = val.split('data: ')
    list.forEach((item) => {
      if (item) content += (JSON.parse(item).choices[0].delta.content || '')
    })
  } catch (error) {
  } finally {
    return content
  }
}
