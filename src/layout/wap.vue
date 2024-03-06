<script setup>
import SideBar from './SideBar.vue'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

onMounted(() => {})
</script>
<template>
  <div class="wap-layout">
    <el-drawer
      v-model="chatStore.collapsed"
      direction="ltr"
      size="256px"
      :before-close="appStore.setSiderCollapsed(!appStore.collapsed)"
    >
      <nav class="nav">
        <SideBar></SideBar>
      </nav>
    </el-drawer>
    <main class="main"><router-view></router-view></main>
  </div>
</template>

<style lang="scss">
.wap-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  .nav {
    display: block;
    width: 256px;
    overflow: hidden;
    background: #ffffff;
    border-right: 1px solid #dddddd;
    height: 95vh;
  }
  .main {
    background-color: #ffffff;
    flex: 1;
  }
}
</style>
