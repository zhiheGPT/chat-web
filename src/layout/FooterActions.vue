<template>
  <div class="actions">
    <div class="left"></div>
    <div class="right">
      <NIcon size="25" color="#999999" @click="openSetting"
        ><SettingsRound
      /></NIcon>
      <NIcon size="25" color="#999999" @click="switchTheme">
        <!-- <BrightnessAutoRound v-if="theme == 'auto'" /> -->
        <LightModeRound v-if="appStore.theme == 'dark'" />
        <DarkModeRound v-else="appStore.theme == 'light'" />
      </NIcon>
    </div>
    <SystemPopup ref="systemPopupRef"></SystemPopup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LightModeRound, SettingsRound, DarkModeRound } from '@vicons/material'
import { NIcon } from 'naive-ui'
import SystemPopup from '@/components/system-popup/index.vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const systemPopupRef = ref()
const openSetting = () => {
  systemPopupRef.value.show()
}

onMounted(() => {
  if (!appStore.key) {
    $message.warning('先配置key再使用哦~')
    openSetting()
  }
})
const switchTheme = () => {
  if (appStore.theme == 'light') appStore.theme = 'dark'
  else appStore.theme = 'light'
}
</script>
<style lang="scss" scoped>
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    .n-icon {
      cursor: pointer;
    }
  }
}
</style>
