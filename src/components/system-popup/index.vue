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
    <el-form label-width="120px">
      <el-form-item label="API Key">
        <el-input v-model="setting.apiKey"></el-input>
      </el-form-item>
      <el-form-item label="自定义模型名称">
        <el-input
          v-model="setting.models"
          type="textarea"
          placeholder="增加自定义模型，多个模型使用逗号(,)隔开
"
        ></el-input>
      </el-form-item>
      <el-form-item label="购买">
        <el-link type="primary" href="https://api.chatfire.cn/"
          >点击立即购买</el-link
        >
      </el-form-item>
      <el-form-item label="联系我们">
        <el-image style="width: 100px; height: 100px" :src="WxCode" fit="fit" />
      </el-form-item>
    </el-form>
  </NModal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { NModal, NTabPane, NTabs } from 'naive-ui'

import { useAppStore } from '@/stores'
import { isPhone } from '@/utils'
import WxCode from '@/assets/WX.png'

const appStore = useAppStore()
const emit = defineEmits(['submit'])

const visible = ref(false)
const setting = reactive({
  apiKey: '',
  models: ''
})

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
