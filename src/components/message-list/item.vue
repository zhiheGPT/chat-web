<!-- 消息列表卡片 -->
<template>
  <div
    class="chat-item"
    :class="{ 'is-active': active }"
    @click="chatStore.setChat(item)"
  >
    <div class="left mr10">
      <img v-if="item.headImg" :src="item.headImg" />
      <span v-else>{{ item.name?.substring(0, 1) }}</span>
    </div>
    <div class="middle">
      <span class="title text-overflow">{{ item.name }}</span>
      <span class="content text-overflow">{{
        item?.lastMsg || '暂无对话'
      }}</span>
    </div>
    <div class="right ml5">
      <span class="last-time">{{
        item?.updateTime && getDatetime(item.updateTime)
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores'
const chatStore = useChatStore()

const emit = defineEmits(['on-remove'])
const props = defineProps({
  active: Boolean,
  item: Object
})
const getDatetime = (datetime) => {}
</script>
<style lang="scss" scoped>
.chat-item {
  @include flex-layout(row, flex-start);
  padding: 5px 0;
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  &:hover,
  &.is-active {
    background-color: #eff4fd;
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
    color: #999999;
    font-size: 12px;
    align-self: flex-end;
  }
}
</style>
