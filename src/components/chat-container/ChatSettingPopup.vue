<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="问答设定"
    :show-icon="false"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submit"
    @on-negative-click="close"
    :positive-button-props="{ color: '#111111' }"
    :negative-button-props="{ ghost: true, color: '#999999' }"
    style="width: 95%; max-width: 640px"
  >
    <NCollapse :default-expanded-names="['1']" @change="handleChange">
      <NCollapseItem name="1" title="角色设定">
        <NForm label-width="100px" label-placement="left">
          <n-form-item label="角色名称">
            <NInput
              v-model:value="setting.name"
              placeholder="请输入名称"
            ></NInput>
          </n-form-item>
          <n-form-item label="引导词">
            <NInput
              v-model:value="setting.prompt"
              placeholder="请输入引导词"
            ></NInput>
          </n-form-item>
        </NForm>
      </NCollapseItem>
      <NCollapseItem name="2" title="问答设置"> </NCollapseItem>
      <NCollapseItem name="3" title="模型设置"> </NCollapseItem>
    </NCollapse>
  </NModal>
</template>

<script setup>
import { ref } from "vue"
import {
  NModal,
  NInput,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
} from "naive-ui"
import { useChatStore } from "@/stores"

const chatStore = useChatStore()
const emit = defineEmits(["submit"])

const visible = ref(false)
const setting = ref({
  name: "",
  prompt: "",
})

const show = () => {
  setting.value.prompt = chatStore.chat.prompt
  setting.value.name = chatStore.chat.name
  visible.value = true
}
const close = () => {
  visible.value = false
}
const submit = () => {
  chatStore.updateChatItem(setting.value)
  close()
}

defineExpose({
  show,
  close,
})
</script>
<style scoped></style>
