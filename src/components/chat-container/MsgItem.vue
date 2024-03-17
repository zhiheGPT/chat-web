<template>
  <div class="msg-item">
    <div v-if="position == 'left'" :class="['msg-item__box', 'msg-item__left']">
      <img src="@/assets/zhihe_logo_blue.png" />
      <div class="left_content">
        <v-md-preview class="md_content" :text="content"></v-md-preview>
        <div v-if="status == 'loading'" class="loading">
          <NSpin :size="15"></NSpin>
        </div>
        <div class="actions mt5">
          <SvgIcon
            :width="15"
            :height="15"
            hover
            icon="icon-park-outline:copy"
            @click="handlerAction('copy')"
          ></SvgIcon>
          <SvgIcon
            :width="15"
            :height="15"
            hover
            icon="bx:like"
            @click="handlerAction"
          ></SvgIcon>
          <SvgIcon
            :width="15"
            :height="15"
            hover
            icon="bx:dislike"
            @click="handlerAction"
          ></SvgIcon>
        </div>
      </div>
    </div>
    <div
      v-if="position == 'right'"
      :class="['msg-item__box', 'msg-item__right']"
    >
      <span class="content">{{ content }}</span>
      <img :src="userStore.avatar" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useUserStore } from "@/stores"
import { NSpin } from "naive-ui"
import { SvgIcon } from "@/components/common"
import { copy } from "@/utils"

const emit = defineEmits(["stop-stream", "on-refresh"])

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  role: String,
  position: String,
})

const userStore = useUserStore()
const content = computed(() => {
  return props.item.userContent || props.item.content
})

const status = computed(() => props.item.status)

const handlerAction = (type) => {
  if (type == "copy") {
    copy(content.value)
    $message.success("复制成功")
  } else {
    $message.success("感谢你的反馈")
  }
}
</script>
<style lang="scss" scoped>
.left_content {
  position: relative;
  overflow: auto;
  .loading {
    position: absolute !important;
    width: 20px;
    height: 20px;
    top: 5px !important;
    right: 5px !important;
  }
}
.msg-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    object-fit: cover;
  }
  .msg-item__box {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    max-width: 70%;
    .content {
      white-space: pre-wrap;
      display: inline-block;
      padding: 16px 20px;
      border-radius: 4px;
      color: #333333;
      word-break: break-all;
    }
    &.msg-item__left {
      align-self: flex-start;
      .content {
        background-color: #e5ebff;
      }
    }
    .actions {
      svg {
        margin-right: 10px;
      }
    }
    &.msg-item__right {
      align-self: flex-end;
      .content {
        background-color: #e5ebff;
      }
    }
  }
}
.stop-btn {
  margin-top: 10px;
  cursor: pointer;
  width: max-content;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: #262626;
}

.md_content {
  background: #e5ebff;
  border-radius: 4px;
  min-height: 40px;
}
:deep(.github-markdown-body) {
  padding: 16px 20px 0;
  font-size: 14px;
}
</style>
