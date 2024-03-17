<template>
  <div class="send-box">
    <div class="addition">
      <div v-if="showFile">
        <!-- <div class="file-preview-actions">
          <span @click="shortcut('生成大纲')">生成大纲</span>
        </div>
         -->
        <n-tag
          round
          :bordered="false"
          closable
          @close="chatStore.updateChatItem({ file: undefined })"
        >
          <span class="file-name">{{ chatStore.chat.file?.filename }}</span>
          <template #avatar>
            <NIcon size="15">
              <DocumentTextOutline />
            </NIcon>
          </template>
        </n-tag>
      </div>
    </div>
    <div class="tools">
      <!-- 模型切换 -->
      <NDropdown :options="appStore.modelList" @select="modelSelect">
        <div class="item">
          <SvgIcon
            :width="20"
            :height="20"
            hover
            icon="mingcute:openai-fill"
          ></SvgIcon>
        </div>
      </NDropdown>

      <!-- 温度修改 -->
      <div class="item">
        <NPopover
          popper-class="popperClass"
          placement="top"
          :width="100"
          trigger="hover"
        >
          <template #trigger>
            <SvgIcon
              :width="20"
              :height="20"
              hover
              icon="mdi:temperature"
            ></SvgIcon>
          </template>
          <NSlider
            v-model:value="sendOptions.temperature"
            size="small"
            :step="0.1"
            :min="0"
            :max="1"
          />
        </NPopover>
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
          <SvgIcon
            :width="20"
            :height="20"
            hover
            icon="ci:cloud-upload"
          ></SvgIcon>
        </div>
      </NUpload>
    </div>
    <NInput
      type="textarea"
      :style="{
        '--n-border-hover': '1px solid gba(255, 255, 255, 0)',
        '--n-box-shadow-focus': '0 0 0 0 rgba(17, 17, 17, 0.2)',
        '--n-border-focus': '1px solid gba(255, 255, 255, 0)',
        '--n-border': '1px solid gba(255, 255, 255, 0)'
      }"
      v-model:value="sendContent"
      maxlength="500"
      :autosize="{ minRows: 2, maxRows: 4 }"
      :placeholder="placeholder"
      @keydown.enter="submit"
    ></NInput>
    <!-- <el-input
      type="textarea"
      v-model="sendContent"
      :autosize="{ minRows: 2, maxRows: 4 }"
      :placeholder="placeholder"
      @keydown.enter="submit"
    >
    </el-input> -->
    <div class="footer">
      <NButton type="primary" :loading="running" @click="submit">
        <NIcon v-if="!running" size="25">
          <SendRound />
        </NIcon>
      </NButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { SvgIcon } from "@/components/common"
import { useSend } from "@/hooks/useSend"
import { useChatStore, useAppStore } from "@/stores"
import { uploadFile } from "@/api"
import { isPhone } from "@/utils"
import {
  NUpload,
  NIcon,
  NButton,
  NDropdown,
  NTag,
  NPopover,
  NSlider,
  NInput,
} from "naive-ui"
import { SendRound } from "@vicons/material"
import { DocumentTextOutline } from "@vicons/ionicons5"

const list = ref([])
const appStore = useAppStore()
const chatStore = useChatStore()
const { running, content, send, handleStop } = useSend(list)

const emit = defineEmits(["submit", "change", "on-before", "on-end"])
const sendContent = ref("")

const showUpload = computed(() => chatStore.tabIndex == 1)
const showFile = computed(() => showUpload.value && chatStore.chat.file)
const fileId = computed(() => {
  if (chatStore.tabIndex == 2) {
    return chatStore.chat.id
  } else {
    return chatStore.chat.file?.id || ""
  }
})

const placeholder = computed(() =>
  isPhone
    ? "传递的你的想法"
    : "传递的你的想法（ctrl + enter 换行，enter发送消息）"
)

const sendOptions = ref({
  model: "glm-4-all",
  temperature: 0.7,
})

// 监听消息响应
watch(
  () => content.value,
  (val) => {
    if (running.value) emit("change", val)
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
  const fileData = file.file
  // 类型限制 jpg jpeg docx doc pdf
  let types = [
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/wps-writer",
    "application/msword",
    "application/pdf",
  ]
  // 校验文件相关信息
  if (types.includes(fileData.type)) {
    // 文件大小相关校验 20M
    const maxSize = 20 * 1000 * 1024
    if (fileData.size >= maxSize) {
      $message.warning("文件大小最多20M")
      return false
    }
    return true
  } else {
    $message.warning("文件格式不支持")
    return false
  }
}

// 文件上传并解析
const ossUploadFile = async ({ file }) => {
  const fileData = file.file
  let formData = new FormData()
  formData.append("file", fileData)
  formData.append("purpose", "file-extract")
  let fileRsp = await uploadFile(formData)
  chatStore.updateChatItem({ file: fileRsp })
}

// 消息发送 ctrl + enter 换行
const submit = async (e) => {
  if (e && e.ctrlKey && e.key === "Enter") {
    sendContent.value += "\n"
    return
  }
  if (running.value) return
  emit("on-before", sendContent.value)
  setTimeout(() => {
    setContent("")
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
      role: "user",
    })
  }
  const req = {
    ...sendOptions.value,
    messages: list,
    stream: true,
  }
  // 判断是否事文件问答
  if (fileId.value) {
    req.file_ids = [fileId.value]
  }
  await send(req)
  emit("on-end", sendContent.value)
}
// 设置输入框
const setContent = (val) => {
  sendContent.value = val
}

const shortcut = (val) => {
  setContent(val)
  submit()
}

defineExpose({ shortcut, setContent, sendOptions, handleStop, running })
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
    .file-name {
      max-width: 60px;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
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
      flex-shrink: 0;
      &.active,
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
  // border-radius: 4px;

  .footer {
    align-self: end;
  }
}
:deep(.n-input){
  background-color: unset !important;
}
</style>
