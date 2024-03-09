<template>
  <div class="header">
    <div class="left">
      <div class="wap-menu">
        <img
          src="@/assets/menu.png"
          alt=""
          @click="appStore.setSiderCollapsed(!appStore.collapsed)"
        />
      </div>
      <div class="img">
        <img :src="item.avatar" alt="" />
      </div>
      <div class="info">
        <div class="title">
          <span>{{ item.title }}</span>
          <div class="tags">
            <NTag class="mr5" size="small">{{ chatStore.sendOptions.model }}</NTag>
            <NTag size="small">{{ chatStore.sendOptions.temperature }}</NTag>
          </div>
        </div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="right">
      <div class="actions">
        <ZhIcon
          :item="{ icon: 'Setting', label: '角色设定' }"
          @on-click="openPromptSet"
        ></ZhIcon>
      </div>
    </div>
    <ChatSettingPopup ref="promptPopupRef"></ChatSettingPopup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ZhIcon from '../zh-icon/index.vue'
import ChatSettingPopup from './ChatSettingPopup.vue'
import { useChatStore, useAppStore } from '@/stores'
import { NTag } from 'naive-ui'

const appStore = useAppStore()
const chatStore = useChatStore()
const emit = defineEmits(['set-prompt'])

const item = computed(() => {
  return chatStore.chat
})

// 引导词设定
const promptPopupRef = ref()

const openPromptSet = () => {
  promptPopupRef.value.show(item.value.prompt)
}
</script>
<style lang="scss" scoped>
.header {
  @include flex-layout(row, space-between);
  border-bottom: 1px solid #dddddd;
  .left {
    @include flex-layout(row, start);
    gap: 10px;
    .wap-menu {
      img {
        height: 32px;
        width: 32px;
      }
    }
    .img {
      height: 32px;
      width: 32px;
      img {
        height: inherit;
        width: inherit;
      }
    }
    .info {
      .title {
        @include flex-layout(row, start);
        gap: 5px;
        margin-bottom: 5px;
      }
      .desc {
        overflow: hidden;
        width: 200px;
        font-size: 12px;
        line-height: 1;
        color: #999999;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .right {
  }
}
</style>
