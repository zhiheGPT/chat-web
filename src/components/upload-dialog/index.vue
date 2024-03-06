<template>
  <el-dialog v-model="visible" title="文件上传" width="60%">
    <div class="top">
      <el-select
        v-model="folderId"
        placeholder="请选择上传的文件夹"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in chatStore.folders"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="container">
      <el-upload
        drag
        multiple
        action=""
        :before-upload="beforeUpload"
        :http-request="ossUploadFile"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽到这里或者 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            图片格式 png/jpg/jpeg 文件格式 pdf/.docx（PPT 等格式建议转换成
            pdf使用）
          </div>
        </template>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()
// 校验
const beforeUpload = (rawFile) => {
  // 类型限制 jpg jpeg docx doc pdf
  let types = [
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/wps-writer',
    'application/pdf'
  ]
  // 校验文件相关信息
  if (types.includes(rawFile.type)) {
    // 文件大小相关校验 20M
    const maxSize = 20 * 1000 * 1024
    if (rawFile.size >= maxSize) {
      ElMessage.warning('文件大小最多20M')
      return false
    }
    return true
  } else {
    ElMessage.warning('文件格式不支持')
    return false
  }
}

// 文件上传并解析
const folderId = ref('')
const ossUploadFile = async (options) => {
  let formData = new FormData()
  formData.append('file', options.file)
  formData.append('purpose', 'file-extract')
  let data = await uploadFile(formData)
  console.log(data)
  visible.value = false
  chatStore.initFolder()
}

const visible = ref(false)
const show = () => {
  visible.value = true
  // folderId.value = chatStore.folders[0]?.id
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
.top {
  margin-bottom: 10px;
}
.container {
}
</style>
