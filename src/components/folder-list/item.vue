<template>
  <div class="folder-box">
    <!-- 有目录 -->
    <template v-if="item.child">
      <div class="folder-item">
        <div class="left h-full">
          <el-icon @click="collapseHandler"
            ><CaretTop v-if="!folder.collapse" /><CaretBottom v-else
          /></el-icon>
          <span class="title">{{ folder.name }}</span>
        </div>
        <!-- <div class="right">
          <el-icon size="18"><MoreFilled /></el-icon>
        </div> -->
      </div>

      <div class="file-box" v-if="item.collapse">
        <div v-for="file in item.child">
          <div
            class="file-item"
            :class="{ 'is-active': chatStore.activeFile?.id === file.id }"
          >
            <div class="left h-full" @click="chatStore.setFile(file)">
              <el-icon><Document /></el-icon>
              <span class="title">{{ file.name }}</span>
            </div>
            <!-- <div class="right">
              <el-icon size="18"><MoreFilled /></el-icon>
            </div> -->
          </div>
        </div>
      </div>
    </template>
    <div v-else class="file-box">
      <div
        class="file-item pl10"
        :class="{ 'is-active': chatStore.file?.id === item.id }"
      >
        <div class="left h-full" @click="selectFile(item)">
          <el-icon><Document /></el-icon>
          <span class="title">{{ item.filename }}</span>
        </div>
        <div class="right">
          <el-icon title="删除" size="18" @click="emit('on-remove-file', item)">
            <Delete />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores'
import { getFileContent } from '@/api'

const emit = defineEmits(['on-remove-folder', 'on-remove-file'])
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const chatStore = useChatStore()

const collapseHandler = () => {
  props.item.collapse = !props.item.collapse
}

const selectFile = async (file) => {
  const { content } = await getFileContent(file.id)
  chatStore.setFile({
    ...file,
    content
  })
}
</script>
<style lang="scss" scoped>
.folder-box {
  @include flex-column;
  &:hover {
    // background-color: #1a1a1a0d;
  }
}
.folder-item,
.file-item {
  @include flex-space-between-center;
  color: #333333;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  height: 40px;
  border-radius: 5px;

  .title {
    cursor: pointer;
    white-space: nowrap;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 80%;
    flex: 1;
    overflow: hidden;
  }
  .right {
    display: none;
  }

  &:hover {
    cursor: pointer;
    background-color: #1a1a1a0d;
    .right {
      display: flex;
    }
  }
  :deep(.el-icon) {
    &:hover,
    &:focus {
      background-color: $light-color-grey-2;
    }
    padding: 2px;
    border-radius: 2px;
    cursor: pointer;
  }
  &.is-active {
    background-color: #1a1a1a0d;
    :deep(.el-icon):hover,
    :deep(.el-icon):focus {
      background-color: #dfe9fc;
    }
  }
}
.folder-item {
  .title {
    font-size: 14px;
    width: 100%;
    line-height: 40px;
  }
}
.file-item {
  padding-left: 25px;

  .title {
    font-size: 14px;
  }
}
</style>
