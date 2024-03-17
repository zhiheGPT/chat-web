<template>
  <div
    class="chat-item"
    :class="{ 'is-active': active }"
    @click="selectFile(item)"
  >
    <div class="left mr10">
      <SvgIcon :width="20" :height="20" icon="gala:file-document"></SvgIcon>
    </div>
    <div class="middle">
      <span class="title text-overflow">{{ item.filename }}</span>
    </div>
    <div class="right ml5">
      <SvgIcon
        :width="18"
        :height="18"
        hover
        icon="lets-icons:dell"
        @click="emit('on-remove-file', item)"
      ></SvgIcon>
    </div>
  </div>

  <!-- <div class="folder-box">
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
            icon="lets-icons:dell"
            @click="emit('on-remove-file', item)"
          ></SvgIcon>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { useChatStore } from "@/stores"
import { getFileContent } from "@/api"
import { SvgIcon } from "@/components/common"

const emit = defineEmits(["on-remove-folder", "on-remove-file"])
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})
const chatStore = useChatStore()

const collapseHandler = () => {
  props.item.collapse = !props.item.collapse
}

const selectFile = async (file) => {
  chatStore.setLoading(true)
  const { content } = await getFileContent(file.id).finally(() =>
    chatStore.setLoading(false)
  )
  chatStore.setFile({
    ...file,
    content,
  })
}
</script>
<style lang="scss" scoped>
.chat-item {
  @include flex-layout(row, flex-start);
  padding: 5px 0;
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  &:hover,
  &.is-active {
    background-color: #eff4fd;
    .right {
      display: flex;
    }
  }

  .left {
    @include flex-layout();
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-left: 5px;
    border-radius: 25px;
    background-color: #ebf0fc;
    span {
      color: #416ccd;
      font-size: 18px;
      font-weight: bold;
    }
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 25px;
    }
  }
  .middle {
    @include flex-layout(column, null, flex-start);
    width: 80%;
    gap: 5px;
    .title {
      font-size: 14px;
      color: #2b4168;
      font-weight: bold;
    }
    .content {
      font-size: 12px;
      color: #7c87ae;
    }
  }
  .right {
    display: none;
    font-size: 12px;
    margin: 0 8px;
  }
}
.dark {
  .chat-item {
    color: #ffffff;
    background-color: #303033;
    &:hover,
    &.is-active {
      background-color: #454548;
    }
    .left {
      background-color: #101014;
    }
    .middle {
      .title {
        color: #c2c1c1;
      }
    }
  }
}
</style>
