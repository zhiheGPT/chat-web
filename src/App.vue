<script setup>
import { useAppStore } from '@/stores'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'

import { useTheme } from '@/hooks/useTheme'
const { theme, themeOverrides } = useTheme()
const appStore = useAppStore()

if (localStorage.getItem('chatbot-api-key')) {
  appStore.setApiKey(localStorage.getItem('chatbot-api-key'))
}
if (localStorage.getItem('chatbot-custom-models')) {
  const t = localStorage.getItem('chatbot-custom-models') || '[]'
  appStore.setCustomModels(JSON.parse(t))
}
</script>
<template>
  <n-config-provider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </n-config-provider>
</template>
<style scoped></style>
