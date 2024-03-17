import { defineStore } from 'pinia'
export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      theme: 'auto',
      collapsed: false,
      apiKey: '',
      models: [
        'gpt-3.5-turbo-0125',
        'gpt-4-0125-preview',
        'gpt-4-turbo-preview',
        'gpt-4-all',
        'gpt-4',
        'kimi-all',
        'glm-4-all',
      ], // 内置模型
      customModels: [], // 自定义模型
    }
  },
  getters: {
    key(state) {
      return state.apiKey || import.meta.env.VITE_API_KEY
    },
    modelList(state) {
      return state.models.concat(state.customModels).filter(t => t).map(val => {
        return {
          label: val,
          key: val,
        }
      })
    }
  },
  actions: {
    setApiKey(key = "") {
      this.apiKey = key
      localStorage.setItem('chatbot-api-key', key)
    },
    setCustomModels(modelsStr = "") {
      if (Array.isArray(modelsStr)) {
        this.customModels = modelsStr
      } else {
        this.customModels = modelsStr.split(",") || []
      }
      localStorage.setItem('chatbot-custom-models', JSON.stringify(this.customModels))
    },
    setSiderCollapsed(t) {
      this.collapsed = t
    }
  }
})
