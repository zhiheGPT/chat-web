import request from "./request"
export * from "./env"
import { getAssetsFile, positionDomViewBottom } from "./tools"

// 判断是否 undefined null 空字符
const isEmpty = (val) => {
  return val === undefined || val === null || val === ""
}

export const generateUUID = () => {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now() // 使用 performance.now() 生成更短的 UUID
  }
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

export const copy = async (val) => {
  // 添加一个input元素放置需要的文本内容
  const copyInput = document.createElement("input")
  copyInput.value = val
  document.body.appendChild(copyInput)
  // 选中并复制文本到剪切板
  copyInput.select()
  document.execCommand("copy")
  document.body.removeChild(copyInput)
}

export { isEmpty, request, getAssetsFile, positionDomViewBottom }
