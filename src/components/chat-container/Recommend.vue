<template>
  <div class="recommend" v-if="chatStore.file.content">
    <el-collapse>
      <el-collapse-item title="点击查看大纲" name="1">
        <span>{{ chatStore.file.content }}</span>
      </el-collapse-item>
    </el-collapse>
    <!-- <p class="tips">选择以下话题快速与我对话</p>
    <div class="list">
      <div class="item" @click="selectPrompt">
        我想拍一个关于美食的视频，受众是年轻人。
      </div>
      <div class="item">我想拍一个关于美食的视频，受众是年轻人。</div>
      <div class="item">我想拍一个关于美食的视频，受众是年轻人。</div>
    </div> -->
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores'
const chatStore = useChatStore()
const emit = defineEmits(['select-prompt'])
const selectPrompt = () => {
  emit('select-prompt', '我想拍一个关于美食的视频，受众是年轻人。')
}
</script>
<style lang="scss" scoped>
.recommend {
  font-size: 14px;
  width: 80%;
  background-color: #ecf1fe;
  border-radius: 4px;
  padding: 20px;
  margin: 20px auto;
  .tips {
    color: #1a1a1a66;
    margin-bottom: 10px;
  }
  .list {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      cursor: pointer;
      margin-bottom: 10px;
      border-radius: 4px;
      padding: 10px 16px;
      width: calc(50% - 40px);
      text-overflow: ellipsis;
      color: #000000;
      background-color: #ffffff;
      &:hover {
        color: #0b66e5;
        background-color: #dbe5fb;
      }
    }
  }
}

:deep(.el-collapse) {
  margin-bottom: 10px;
  .el-collapse-item__header {
    padding-left: 15px;
    color: #000000;
    border-radius: 5px;
  }
  .el-collapse-item__wrap {
    padding-left: 15px;
    color: #000000;
    border-radius: 5px;
  }
}
</style>
