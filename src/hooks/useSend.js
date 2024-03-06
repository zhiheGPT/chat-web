import { ref } from 'vue'
import { chat2gpt } from '@/api'
import { positionDomViewBottom } from '@/utils'

export const useSend = (messages) => {
  const running = ref(false)
  const content = ref('')

  const send = async (data) => {
    // 发送之前进行套餐校验
    running.value = true
    return chat2gpt(data)
      .then(async (res) => {
        if (res.status == 200) {
          await readerStream(res)
        } else {
          throw Error(res)
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        running.value = false
        content.value = ''
      })
  }

  // 文件流处理
  const readerStream = async (res) => {
    return new Promise(async (resolve, reject) => {
      const reader = res.body.getReader()
      while (true) {
        const { value, done } = await reader.read()
        let decodeVal = new TextDecoder().decode(value)
        console.log('decodeVal', decodeVal);
        // TODO 异常直接终止
        // if (decodeVal.startsWith('{"code"')) {
        //   reject(decodeVal)
        // }
        if (done) break
        content.value += getVal(decodeVal)
      }
      resolve()
    })
  }
  return {
    content,
    running,
    send,
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
