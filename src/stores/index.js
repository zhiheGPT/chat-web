import { createPinia } from 'pinia'
import { useAppStore } from './appStore'
import { useUserStore } from './userStore'
import { useChatStore } from './chatStore'
const store = createPinia()

export default store

export {
    useAppStore, useUserStore, useChatStore
}