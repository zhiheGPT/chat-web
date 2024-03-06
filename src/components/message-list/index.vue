<template>
  <div class="message-list">
    <template v-if="list.length > 0">
      <MessageItem
        v-for="(item, index) in list"
        class="mb10"
        :item="item"
        :active="item.id == chatStore.chat.id"
        :key="item.id"
      ></MessageItem>
    </template>
    <el-empty v-else v-loading="loading" description="暂无数据" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import MessageItem from './item.vue'
import { data } from './mock'
import { useChatStore } from '@/stores'

defineProps({
  list: Array
})

const chatStore = useChatStore()
</script>
<style lang="scss" scoped>
.message-list {
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
