<template>
  <aside>
    <div class="top">
      <n-text class="title">AI 火哥</n-text>
      <div class="actions">
        <template v-if="chatStore.tabIndex == 1">
          <SvgIcon
            :width="20"
            :height="20"
            hover
            icon="material-symbols:chat-outline"
            @click="chatStore.createChat"
          ></SvgIcon>
        </template>
        <template v-else>
          <!-- 上传 -->
          <SvgIcon
            :width="20"
            :height="20"
            hover
            icon="ci:cloud-upload"
            @click="openUpload"
          ></SvgIcon>
        </template>
      </div>
    </div>
    <div class="tabs h-full">
      <n-tabs
        v-model:value="chatStore.tabIndex"
        type="segment"
        default-value="1"
        animated
      >
        <n-tab-pane name="1" tab="问答助手">
          <NScrollbar>
            <MessageList :list="chatStore.chatList"></MessageList>
          </NScrollbar>
        </n-tab-pane>
        <n-tab-pane name="2" tab="文件管理">
          <NScrollbar>
            <FolderList></FolderList>
          </NScrollbar>
        </n-tab-pane>
      </n-tabs>
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
import { ref, onMounted } from "vue"
import FolderList from "@/components/folder-list/index.vue"
import MessageList from "@/components/message-list/index.vue"
import UploadDialog from "@/components/upload-dialog/index.vue"
import FooterActions from "./FooterActions.vue"
import { useChatStore, useAppStore } from "@/stores"
import { NTabs, NScrollbar, NTabPane, NText } from "naive-ui"
import { useBasicLayout } from "@/hooks/useBasicLayout"
import { SvgIcon } from "@/components/common"

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
      font-size: 18px;
      font-weight: bold;
    }
    .actions {
      @include flex-layout();
      gap: 10px;
      .n-icon {
        color: #999999;
        &:hover {
          color: #000000;
        }
      }
      .folder_new {
        display: flex;
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
  .tabs {
    height: 100%;
    overflow: hidden;
    .n-tabs {
      height: 100%;
    }
    .n-tab-pane {
      height: 100%;
    }
  }
}
</style>
