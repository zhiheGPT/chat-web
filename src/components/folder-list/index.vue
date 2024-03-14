<template>
  <NSpin class="folders" :show="loading">
    <ul v-if="folders.length > 0 || loading">
      <li v-for="folder in folders" :key="folder.id">
        <Item
          :item="folder"
          @on-remove-folder="removeFolder"
          @on-remove-file="removeFile"
        ></Item>
      </li>
    </ul>
    <NEmpty v-else description="暂无数据" />
  </NSpin>
</template>

<script setup>
import { watch } from "vue";
import Item from "./item.vue";
import { useFile } from "@/hooks/useFile";
import { useAppStore } from "@/stores";
import { NSpin, NEmpty } from "naive-ui";

const appStore = useAppStore();

const { folders, loading, initFolder, deleteFile } = useFile();

watch(
  () => appStore.key,
  (val) => {
    val && initFolder();
  },
  { immediate: true }
);

const removeFolder = () => {};
const removeFile = ({ id }) => {
  deleteFile(id);
};
</script>
<style scoped lang="scss">
.folders {
  min-height: 70vh;
  width: 100%;
  overflow: auto;
}
</style>
