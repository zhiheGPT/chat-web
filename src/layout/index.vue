<script setup>
import { onMounted, computed, ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import SideBar from './SideBar.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore } from '@/stores'
const appStore = useAppStore()

const { isMobile } = useBasicLayout()

const getMobileClass = computed(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50
    }
  }
  return {}
})

onMounted(() => {})
</script>
<template>
  <div class="layout">
    <NLayout has-sider>
      <NLayoutSider
        :collapsed="appStore.collapsed"
        :collapsed-width="0"
        :width="240"
        :show-trigger="isMobile ? false : 'arrow-circle'"
        collapse-mode="transform"
        bordered
        @update-collapsed="appStore.setSiderCollapsed"
      >
        <SideBar></SideBar>
      </NLayoutSider>
      <NLayoutContent style="flex: 1">
        <router-view></router-view>
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  height: 100vh;
  width: 100%;
  .nav {
    display: block;
    width: 256px;
    overflow: hidden;
    background: #ffffff;
    border-right: 1px solid #dddddd;
  }
  .main {
    width: 100%;
  }
}
</style>
