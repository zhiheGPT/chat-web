export const positionDomViewBottom = (className = '_message_list') => {
  setTimeout(() => {
    let container = document.getElementsByClassName(className)[0]
    container.scrollTop = container.scrollHeight
  })
}

// 获取assets静态资源
export const getAssetsFile = (url) => {
  return new URL(url, import.meta.url).href
}
