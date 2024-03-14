<script setup>
import { onMounted, computed, ref } from "vue";
import { NLayout, NLayoutSider, NLayoutContent, NSpin } from "naive-ui";
import SideBar from "./SideBar.vue";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { useAppStore, useChatStore } from "@/stores";
const appStore = useAppStore();
const chatStore = useChatStore();

const { isMobile } = useBasicLayout();

const getContainerClass = computed(() => {
  return ["h-full", { pl240: !isMobile.value && !appStore.collapsed }];
});
onMounted(() => {});
</script>
<template>
  <NSpin class="h-full overflow-hidden" :show="chatStore.loading">
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
  </NSpin>
</template>

<style lang="scss">
.n-spin-content {
  height: 100%;
}
</style>
