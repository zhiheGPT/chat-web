<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="640"
    :show-close="false"
    @close="visible = false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="content">
      <div v-html="agreementType == 1 ? userAgreement : privacyAgreement"></div>
      <!-- {{ agreementType == 1 ? userAgreement : privacyAgreement }} -->
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userAgreement, privacyAgreement } from './constant'
const visible = ref(false)
const title = ref('')
const agreementType = ref(1)

const show = (type: number) => {
  agreementType.value = type
  title.value = type == 1 ? '知盒慧答用户协议' : '知盒慧答用户隐私政策'
  visible.value = true
}
const close = () => {
  visible.value = false
}
defineExpose({
  show,
  close
})
</script>
<style lang="scss" scoped>
.content {
  height: 50vh;
  overflow: auto;
  white-space: pre-wrap;
}
</style>
