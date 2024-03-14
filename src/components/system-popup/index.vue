<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="设置"
    :show-icon="false"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submit"
    @on-negative-click="visible = false"
    :positive-button-props="{ color: '#111111' }"
    :negative-button-props="{ ghost: true, color: '#999999' }"
    style="width: 95%; max-width: 640px"
  >
    <NForm label-width="120px" label-placement="left">
      <n-form-item label="API Key">
        <NInput
          v-model:value="setting.apiKey"
          placeholder="请输入名称"
        ></NInput>
      </n-form-item>
      <n-form-item label="自定义模型名称">
        <NInput
          v-model:value="setting.models"
          type="textarea"
          placeholder="增加自定义模型，多个模型使用逗号(,)隔开"
        ></NInput>
      </n-form-item>
      <n-form-item label="购买">
        <n-button text type="primary" @click="open"> 点击立即购买 </n-button>
      </n-form-item>
      <n-form-item label="联系我们">
        <NImage style="width: 100px; height: 100px" :src="WxCode" fit="fit" />
      </n-form-item>
    </NForm>
  </NModal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { NModal, NButton, NForm, NFormItem, NInput, NImage } from 'naive-ui'
import { useAppStore } from '@/stores'
import WxCode from '@/assets/WX.png'

const appStore = useAppStore()
const emit = defineEmits(['submit'])

const visible = ref(false)
const setting = reactive({
  apiKey: '',
  models: ''
})

const open = () => {
  window.open('https://api.chatfire.cn/')
}

const show = () => {
  setting.apiKey = appStore.apiKey
  setting.models = appStore.customModels.join(',')
  visible.value = true
}
const close = () => {
  visible.value = false
}
const submit = () => {
  appStore.setApiKey(setting.apiKey)
  appStore.setCustomModels(setting.models)
  close()
}

defineExpose({
  show,
  close
})
</script>
<style scoped></style>
