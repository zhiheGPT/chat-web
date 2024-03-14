<template>
  <n-modal
    style="width: 95%; max-width: 640px"
    v-model:show="visible"
    preset="dialog"
    title="上传"
    :show-icon="false"
  >
    <n-upload
      multiple
      directory-dnd
      action=""
      :max="5"
      :on-before-upload="beforeUpload"
      :custom-request="ossUploadFile"
    >
      <n-upload-dragger>
        <div class="uploadBox">
          <div style="margin-bottom: 12px">
            <n-icon size="42" :depth="3">
              <ArchiveOutline />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            图片格式 png/jpg/jpeg 文件格式 pdf/.docx（PPT 等格式建议转换成
            pdf使用）
          </n-p>
        </div>
      </n-upload-dragger>
    </n-upload>
  </n-modal>
</template>

<script setup>
import { ref } from "vue";
import {
  NTabs,
  NScrollbar,
  NTabPane,
  NIcon,
  NUpload,
  NModal,
  NUploadDragger,
} from "naive-ui";
import { uploadFile } from "@/api";
import { useChatStore } from "@/stores";
import { ArchiveOutline } from "@vicons/ionicons5";

const chatStore = useChatStore();
// 校验
const beforeUpload = ({file}) => {
  const fileData = file.file
  // 类型限制 jpg jpeg docx doc pdf
  let types = [
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/wps-writer",
    "application/msword",
    "application/pdf",
  ];
  // 校验文件相关信息
  if (types.includes(fileData.type)) {
    // 文件大小相关校验 20M
    const maxSize = 20 * 1000 * 1024;
    if (fileData.size >= maxSize) {
      $message.warning("文件大小最多20M");
      return false;
    }
    return true;
  } else {
    $message.warning("文件格式不支持");
    return false;
  }
};

// 文件上传并解析
const folderId = ref("");
const ossUploadFile = async ({file}) => {
  const fileData = file.file
  let formData = new FormData();
  formData.append("file", fileData);
  formData.append("purpose", "file-extract");
  let data = await uploadFile(formData);
  console.log(data);
  visible.value = false;
  chatStore.initFolder();
};

const visible = ref(false);
const show = () => {
  visible.value = true;
  // folderId.value = chatStore.folders[0]?.id
};
const close = () => {
  visible.value = false;
};
defineExpose({
  show,
  close,
});
</script>
<style lang="scss" scoped>
.top {
  margin-bottom: 10px;
}
.n-dialog.n-modal {
  width: 600px !important;
  height: 400px !important;
}
.uploadBox {
  height: 220px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px 40px 40px;
}
</style>
