<template>
  <div class="send-box">
    <div class="addition">
      <div v-if="showFile" class="file-operation">
        <div class="file-preview">
          <span class="file-preview-type">
            <el-icon><Document /></el-icon>
          </span>
          <span class="file-preview-name">{{
            chatStore.chat.file?.filename
          }}</span>
        </div>
        <div class="file-preview-actions">
          <span @click="shortcut('生成大纲')">生成大纲</span>
        </div>
        <el-icon
          class="del"
          :size="12"
          @click="chatStore.updateChatItem({ file: undefined })"
          ><CircleClose
        /></el-icon>
      </div>
    </div>
    <div class="tools">
      <!-- 模型切换 -->
      <NDropdown :options="appStore.modelList" @select="modelSelect">
        <div class="item">
          <el-icon :size="15"><Cpu /></el-icon>
        </div>
      </NDropdown>

      <!-- 温度修改 -->
      <div class="item">
        <el-popover
          popper-class="popperClass"
          placement="top"
          :width="100"
          trigger="hover"
        >
          <template #reference>
            <el-icon :size="15"><Odometer /></el-icon>
          </template>
          <el-slider
            v-model="sendOptions.temperature"
            size="small"
            step="0.1"
            :min="0"
            :max="1"
          />
        </el-popover>
      </div>
      <!-- 文件上传 -->
      <NUpload
        v-if="showUpload"
        action=""
        :show-file-list="false"
        :on-before-upload="beforeUpload"
        :custom-request="ossUploadFile"
      >
        <div class="item">
          <el-icon :size="15"><UploadFilled /></el-icon>
        </div>
      </NUpload>
    </div>
    <el-input
      type="textarea"
      v-model="sendContent"
      maxlength="500"
      resize="none"
      :autosize="{ minRows: 2, maxRows: 4 }"
      :placeholder="placeholder"
      @keydown.enter="submit"
    >
    </el-input>
    <div class="footer">
      <el-button type="primary" color="#111111" @click="submit">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useSend } from '@/hooks/useSend'
import { useChatStore, useAppStore } from '@/stores'
import { uploadFile } from '@/api'
import { isPhone } from '@/utils'
import { NUpload, NDropdown } from 'naive-ui'

const list = ref([])
const appStore = useAppStore()
const chatStore = useChatStore()
const { running, content, send } = useSend(list)

const emit = defineEmits(['submit', 'change', 'on-before', 'on-end'])
const sendContent = ref('')

const showUpload = computed(() => chatStore.tabIndex == 1)
const showFile = computed(() => showUpload.value && chatStore.chat.file)
const fileId = computed(() => {
  if (chatStore.tabIndex === 2) {
    return chatStore.chat.id
  } else {
    return chatStore.chat.file?.id || ''
  }
})

const placeholder = computed(() =>
  isPhone
    ? '传递的你的想法'
    : '传递的你的想法（ctrl + enter 换行，enter发送消息）'
)

const sendOptions = ref({
  model: 'kimi-all',
  temperature: 0.7
})

// 监听消息响应
watch(
  () => content.value,
  (val) => {
    if (running.value) emit('change', val)
  }
)
// 监听消息配置
watch(
  () => sendOptions.value,
  (data) => {
    chatStore.setSendOptions(data)
  },
  { immediate: true, deep: true }
)

// 模型切换
const modelSelect = (val) => {
  sendOptions.value.model = val
}

// 校验
const beforeUpload = ({ file }) => {
  // 类型限制 jpg jpeg docx doc pdf
  let types = [
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/wps-writer',
    'application/pdf'
  ]
  // 校验文件相关信息
  if (types.includes(file.type)) {
    // 文件大小相关校验 20M
    const maxSize = 20 * 1000 * 1024
    if (file.size >= maxSize) {
      $message.warning('文件大小最多20M')
      return false
    }
    return true
  } else {
    $message.warning('文件格式不支持')
    return false
  }
}

// 文件上传并解析
const ossUploadFile = async (options) => {
  let formData = new FormData()
  formData.append('file', options.file)
  formData.append('purpose', 'file-extract')
  let file = await uploadFile(formData)
  chatStore.updateChatItem({ file })
}

// 消息发送 ctrl + enter 换行
const submit = async (e) => {
  if (e && e.ctrlKey && e.key === 'Enter') {
    sendContent.value += '\n'
    return
  }
  if (running.value) return
  emit('on-before', sendContent.value)
  setTimeout(() => {
    setContent('')
  })
  const list = chatStore.messageList
    .filter((item) => item.content)
    .map(({ content, role }) => {
      return { content, role }
    })
  // 插入引导词
  if (chatStore.chat.prompt) {
    list.splice(-1, 0, {
      content: chatStore.chat.prompt,
      role: 'user'
    })
  }
  const req = {
    ...sendOptions.value,
    messages: list,
    stream: true
  }
  // 判断是否事文件问答
  if (fileId.value) {
    req.file_ids = [fileId.value]
  }
  await send(req)
  emit('on-end', sendContent.value)
}
// 设置输入框
const setContent = (val) => {
  sendContent.value = val
}

const shortcut = (val) => {
  setContent(val)
  submit()
}

defineExpose({ shortcut, setContent, sendOptions })
</script>
<style lang="scss" scoped>
.send-box {
  @include flex-layout(column, start, start);
  box-sizing: border-box;
  padding-bottom: 10px;
  .addition {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid #dddddd;
    font-size: 14px;
    .file-operation {
      height: 25px;
      border-radius: 18px;
      background: #e9ebfb;
      display: inline-flex;
      align-items: center;
      padding: 5px 15px;
      cursor: pointer;
      &:hover {
        .del {
          display: block;
        }
      }
      .file-preview {
        display: flex;
        align-items: center;
        .file-preview-type {
          margin: 0 5px;
        }
        .file-preview-name {
          padding-right: 10px;
          border-right: 1px solid #9e9e9e;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
          max-width: 100px;
        }
      }
      .file-preview-actions {
        color: #415fff;
        span {
          padding-left: 10px;
        }
      }
      .del {
        display: none;
        margin-left: 8px;
        &:hover {
          color: #415fff;
        }
      }
    }
  }
  .tools {
    margin-top: 5px;
    display: flex;
    gap: 10px;
    .item {
      @include flex-layout();
      cursor: pointer;
      border-radius: 8px;
      height: 25px;
      width: 25px;
      .el-icon {
        color: #999999;
      }
      &.active,
      &:hover {
        background-color: #f3f3f3;
        .el-icon {
          color: #000000;
        }
      }
    }
  }
  // border-radius: 4px;

  .footer {
    align-self: end;
  }
}

:deep(textarea) {
  background: transparent;
  border: none;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
  }
}
</style>
