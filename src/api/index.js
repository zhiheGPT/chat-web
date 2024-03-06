export * from './file'
export * from './user'
export * from './chat-stream'

console.log('import.meta.env.', import.meta.env)
const isENV = import.meta.env.DEV
const saasHost = isENV ? '/saas' : `/zhihe-saas`

export { saasHost, isENV }
