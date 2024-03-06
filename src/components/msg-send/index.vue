<template>
  <div class="container">
    <div class="send-box">
      <el-icon v-if="precise" class="setting" :size="24"><Setting /></el-icon>
      <el-input
        type="textarea"
        v-model="sendContent"
        maxlength="500"
        :autosize="{ minRows: 2, maxRows: 4 }"
        resize="none"
        show-word-limit
        placeholder="传递的你的想法（ctrl + enter 换行，enter发送消息）"
        @keydown.enter="sendMessage"
      >
      </el-input>
      <div class="actions">
        <img
          v-if="!loading"
          src="@/assets/send-black.png"
          @click="sendMessage"
        />
        <img v-else src="@/assets/loading.gif" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useChatStore } from '@/stores'
const props = defineProps({
  loading: Boolean,
  precise: { type: Boolean, default: true }
})

const emit = defineEmits(['submit'])
const chatStore = useChatStore()
const sendContent = ref('')

watch(
  () => chatStore.sendContent,
  (val) => {
    sendContent.value = val
  }
)

// 消息发送
const sendMessage = (e) => {
  // ctrl + enter 换行
  if (e.ctrlKey && e.key === 'Enter') {
    sendContent.value += '\n'
    return
  }
  if (props.loading) return

  // 备份提问语言
  emit('submit', sendContent.value)
  // positionDomViewBottom('el-scrollbar__wrap')
  setTimeout(() => {
    setContent('')
  })
  chatStore.sendContent = ''
}
// 清空输入框
const setContent = (val) => {
  sendContent.value = val
}

defineExpose({ setContent })
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  .send-box {
    @include flex-layout();
    padding: 10px 20px;
    background: #f3f6ff;
    box-shadow: 0px 0px 13px 0px #f0f4ff;
    border-radius: 4px;
    gap: 20px;
    .setting {
      cursor: pointer;
    }
    .actions {
      @include flex-layout();
      align-self: flex-end;
      padding: 10px 0;
      gap: 20px;
      img {
        cursor: pointer;
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
