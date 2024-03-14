<template>
  <div class="header">
    <div class="left">
      <div class="wap-menu">
        <SvgIcon
          :width="32"
          :height="32"
          hover
          icon="gg:menu"
          @click="appStore.setSiderCollapsed(!appStore.collapsed)"
        ></SvgIcon>
      </div>
      <div class="img">
        <n-image v-if="item.avatar" width="32" :src="item.avatar"></n-image>
        <n-image v-else width="32" height="32" :src="DefaultImage" />
      </div>
      <div class="info">
        <div class="title">
          <span>{{ item.title }}</span>
          <div class="tags">
            <NTag class="mr5" size="small">{{
              chatStore.sendOptions.model
            }}</NTag>
            <NTag size="small">{{ chatStore.sendOptions.temperature }}</NTag>
          </div>
        </div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="right">
      <div class="actions">
        <SvgIcon
          :width="18"
          :height="18"
          hover
          icon="lucide:edit"
          @click="openPromptSet"
        ></SvgIcon>
      </div>
    </div>
    <ChatSettingPopup ref="promptPopupRef"></ChatSettingPopup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ChatSettingPopup from "./ChatSettingPopup.vue";
import { useChatStore, useAppStore } from "@/stores";
import { NTag, NImage } from "naive-ui";
import DefaultImage from "@/assets/default-image.png";
import { SvgIcon } from "@/components/common";

const appStore = useAppStore();
const chatStore = useChatStore();
const emit = defineEmits(["set-prompt"]);

const item = computed(() => {
  return chatStore.chat;
});

// 引导词设定
const promptPopupRef = ref();

const openPromptSet = () => {
  promptPopupRef.value.show(item.value.prompt);
};
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
