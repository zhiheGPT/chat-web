const isENV = import.meta.env.DEV
export const hosts = {
  file: isENV ? '/fileapi' : 'http://jupyter.skyman.cloud:37777',
  chat: isENV ? '/chatapi' : 'https://api.chatllm.vip',
}