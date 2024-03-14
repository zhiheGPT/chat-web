<template>
  <div class="folder-box">
    <div class="file-box">
      <div
        class="file-item pl10"
        :class="{ 'is-active': chatStore.file?.id === item.id }"
      >
        <div class="left h-full" @click="selectFile(item)">
          <SvgIcon :width="20" :height="20" icon="gala:file-document"></SvgIcon>
          <span class="title">{{ item.filename }}</span>
        </div>
        <div class="right">
          <SvgIcon
            :width="18"
            :height="18"
            hover
            icon="mingcute:delete-2-line"
            @click="emit('on-remove-file', item)"
          ></SvgIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores";
import { getFileContent } from "@/api";
import { SvgIcon } from "@/components/common";

const emit = defineEmits(["on-remove-folder", "on-remove-file"]);
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const chatStore = useChatStore();

const collapseHandler = () => {
  props.item.collapse = !props.item.collapse;
};

const selectFile = async (file) => {
  chatStore.setLoading(true);
  const { content } = await getFileContent(file.id).finally(() =>
    chatStore.setLoading(false)
  );
  chatStore.setFile({
    ...file,
    content,
  });
};
</script>
<style lang="scss" scoped>
.folder-box {
  @include flex-column;
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
  &.is-active {
    background-color: #1a1a1a0d;
  }
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
.dark {
  .file-item {
    color: #ffffff;
    background-color: #303033;
    &:hover,
    &.is-active {
      background-color: #454548;
    }
    .left {
      // background-color: #101014;
    }
  }
}
</style>
