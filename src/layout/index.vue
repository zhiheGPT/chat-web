<script setup>
import { onMounted, computed, ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import SideBar from './SideBar.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore } from '@/stores'
const appStore = useAppStore()

const { isMobile } = useBasicLayout()

const getContainerClass = computed(() => {
  return ['h-full', { pl240: !isMobile.value && !appStore.collapsed }]
})
onMounted(() => {})
</script>
<template>
  <div class="h-full overflow-hidden">
    <NLayout :class="getContainerClass" has-sider>
      <NLayoutSider
        :collapsed="appStore.collapsed"
        :collapsed-width="0"
        :width="240"
        :show-trigger="isMobile ? false : 'arrow-circle'"
        collapse-mode="transform"
        position="absolute"
        bordered
        @update-collapsed="appStore.setSiderCollapsed"
      >
        <SideBar></SideBar>
      </NLayoutSider>
      <NLayoutContent class="h-full">
        <router-view></router-view>
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<style lang="scss"></style>
