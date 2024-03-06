<template>
  <div class="msg-item">
    <div v-if="position == 'left'" :class="['msg-item__box', 'msg-item__left']">
      <img src="@/assets/zhihe_logo_blue.png" />
      <div class="left_content">
        <v-md-preview class="md_content" :text="content"></v-md-preview>
        <div v-if="status == 'loading'" v-loading="true" class="loading"></div>
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
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'

const emit = defineEmits(['stop-stream', 'on-refresh'])

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  role: String,
  position: String
})

const userStore = useUserStore()
const content = computed(() => {
  return props.item.userContent || props.item.content
})

const status = computed(() => props.item.status)
</script>
<style lang="scss" scoped>
.left_content {
  position: relative;
  max-width: 1200px;
  .loading {
    position: absolute !important;
    width: 20px;
    height: 20px;
    top: 5px !important;
    right: 5px !important;
    :deep(.el-loading-mask) {
      background-color: unset;
      .el-loading-spinner {
        width: 20px;
        height: 20px;
        top: 20px;
        .circular {
          width: inherit;
          height: inherit;
        }
      }
    }
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
    }
    &.msg-item__left {
      align-self: flex-start;
      .content {
        background-color: #e5ebff;
      }
    }
    .msg-actions {
      padding-top: 10px;
      display: flex;
      gap: 14px;
      img {
        width: 16px;
        height: 16px;
        cursor: pointer;
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
  min-height: 60px;
}
:deep(.github-markdown-body) {
  padding: 16px 20px 0;
  font-size: 14px;
}
</style>
