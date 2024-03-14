<template>
  <NSpin class="message-list" :show="false">
    <template v-if="list.length > 0">
      <MessageItem
        v-for="item in list"
        class="mb10"
        :item="item"
        :active="item.id == chatStore.chat.id"
        :key="item.id"
      ></MessageItem>
    </template>
    <NEmpty v-else description="暂无数据" />
  </NSpin>
</template>

<script setup>
import MessageItem from "./item.vue"
import { useChatStore } from "@/stores"
import { NSpin, NEmpty } from "naive-ui"

defineProps({
  list: Array,
})

const chatStore = useChatStore()
</script>
<style lang="scss" scoped>
.message-list {
  min-height: 70vh;
  .list {
    overflow: auto;
    flex: 1;
  }
  .loading {
    @include flex-layout();
    gap: 5px;
    height: 45px;
    font-size: 14px;
    color: #7c87ae;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .no-more {
    height: 45px;
  }
}
</style>
