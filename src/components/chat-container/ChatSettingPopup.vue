<template>
  <el-dialog
    v-model="visible"
    title="问答设定"
    :width="isPhone ? '90%' : '60%'"
    @close="close"
  >
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template #title>
          <el-icon class="mr5"><User /></el-icon>角色设定
        </template>
        <el-form label-width="100px">
          <el-form-item label="角色名称">
            <el-input v-model="setting.name"></el-input>
          </el-form-item>
          <el-form-item label="引导词">
            <el-input v-model="setting.prompt"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <el-icon class="mr5"><ChatLineRound /></el-icon>聊天设置
        </template>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <el-icon class="mr5"><Cpu /></el-icon>模型设置
        </template>
      </el-collapse-item>
    </el-collapse>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="info" @click="visible = false">取消</el-button>
        <el-button type="primary" color="#111111" @click="submit"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores'
import { isPhone } from '@/utils'

const chatStore = useChatStore()
const emit = defineEmits(['submit'])

const visible = ref(false)
const activeNames = ref('1')
const setting = ref({
  name: '',
  prompt: ''
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
  close
})
</script>
<style scoped></style>
