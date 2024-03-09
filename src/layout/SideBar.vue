<template>
  <aside>
    <div class="top">
      <span class="title">ChatFire</span>
      <div class="actions">
        <template v-if="chatStore.tabIndex == 1">
          <el-icon class="cursor-p" :size="20" @click="chatStore.createChat"
            ><ChatLineSquare
          /></el-icon>
        </template>
        <template v-else>
          <!-- 上传 -->
          <el-icon class="cursor-p" :size="20" @click="openUpload"
            ><UploadFilled
          /></el-icon>
        </template>
      </div>
    </div>
    <div class="tabs">
      <n-tabs
        v-model:value="chatStore.tabIndex"
        type="segment"
        default-value="1"
        animated
      >
        <n-tab-pane name="1" tab="问答助手"></n-tab-pane>
        <n-tab-pane name="2" tab="文件管理"></n-tab-pane>
      </n-tabs>
    </div>
    <div class="h-full overflow-hidden">
      <NScrollbar>
        <MessageList
          v-show="chatStore.tabIndex == 1"
          :list="chatStore.chatList"
        ></MessageList>
        <FolderList v-show="chatStore.tabIndex == 2"></FolderList>
      </NScrollbar>
    </div>
    <FooterActions></FooterActions>
    <UploadDialog ref="uploadDialogRef"></UploadDialog>
  </aside>
  <!-- 移动端蒙层 -->
  <template v-if="isMobile">
    <div
      v-show="!appStore.collapsed"
      class="mask w-full h-full"
      @click="appStore.setSiderCollapsed(true)"
    ></div>
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FolderList from '@/components/folder-list/index.vue'
import MessageList from '@/components/message-list/index.vue'
import UploadDialog from '@/components/upload-dialog/index.vue'
import FooterActions from './FooterActions.vue'
import { useChatStore, useAppStore } from '@/stores'
import { NTabs, NScrollbar, NTabPane } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const chatStore = useChatStore()
const appStore = useAppStore()

onMounted(() => {
  chatStore.initChat()
})
const uploadDialogRef = ref()
const openUpload = () => {
  uploadDialogRef.value.show()
}
</script>
<style lang="scss" scoped>
aside {
  @include flex-layout(column, start, start);
  height: 100%;
  border-right: 1px solid #dddddd;
  padding: 10px;
  box-sizing: border-box;
  > div {
    width: 100%;
  }
  .top {
    @include flex-layout(row, space-between);
    margin-bottom: 10px;
    color: #999999;
    .title {
      color: #000000;
      font-size: 18px;
      font-weight: bold;
    }
    .actions {
      @include flex-layout();
      color: #999999;
      gap: 10px;
      .el-icon {
        &:hover {
          color: #000000;
        }
      }
      .folder_new {
        display: flex;
      }
    }
    .el-icon {
      &:hover {
        color: #000000;
      }
    }
  }
  .search {
    margin-bottom: 10px;
  }
  .mask {
    position: fixed;
    background-color: rgba(178, 178, 178, 0.5);
    z-index: 99;
    top: 0;
    right: 0;
    width: calc(100vw - 240px);
  }
}
</style>
