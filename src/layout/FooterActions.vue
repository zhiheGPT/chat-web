<template>
  <div class="actions">
    <div class="left"></div>
    <div class="right">
      <SvgIcon
        :width="25"
        :height="25"
        hover
        icon="uil:setting"
        @click="openSetting"
      ></SvgIcon>
      <SvgIcon
        :width="25"
        :height="25"
        hover
        :icon="
          appStore.theme == 'light'
            ? 'ic:round-dark-mode'
            : 'ic:round-light-mode'
        "
        @click="switchTheme"
      ></SvgIcon>
    </div>
    <SystemPopup ref="systemPopupRef"></SystemPopup>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import SystemPopup from "@/components/system-popup/index.vue"
import { useAppStore } from "@/stores"
import { SvgIcon } from "@/components/common"

const appStore = useAppStore()
const systemPopupRef = ref()
const openSetting = () => {
  systemPopupRef.value.show()
}

onMounted(() => {
  if (!appStore.key) {
    $message.warning("先配置key再使用哦~")
    openSetting()
  }
})
const switchTheme = () => {
  if (appStore.theme == "light") appStore.theme = "dark"
  else appStore.theme = "light"
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
  }
}
</style>
