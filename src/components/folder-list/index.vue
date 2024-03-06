<template>
  <div class="folders" v-loading="loading">
    <ul v-if="folders.length > 0">
      <li v-for="folder in folders" :key="folder.id">
        <Item
          :item="folder"
          @on-remove-folder="removeFolder"
          @on-remove-file="removeFile"
        ></Item>
      </li>
    </ul>
    <el-empty v-else description="暂无数据" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Item from './item.vue'
import { useFile } from '@/hooks/useFile'


const { folders, loading, initFolder, deleteFile } = useFile()
onMounted(async () => {
  initFolder()
})
const removeFolder = () => {}
const removeFile = ({ id }) => {
  deleteFile(id)
}
</script>
<style scoped lang="scss">
.folders {
  width: 100%;
  overflow: auto;
  .list {
  }
}
</style>
