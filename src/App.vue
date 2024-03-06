<script setup>
import { useAppStore } from '@/stores'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
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
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </n-config-provider>
</template>
<style scoped></style>
