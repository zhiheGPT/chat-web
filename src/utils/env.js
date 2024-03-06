function isMobileDevice() {
  return /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)
}

export const isPhone = isMobileDevice()
export const isPC = !isMobileDevice()
export const isWX = navigator.userAgent.toLowerCase().includes('micromessenger')
