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
        item?.lastMsg || "暂无对话"
      }}</span>
    </div>
    <div class="right">
      <span class="last-time">{{
        item?.updateTime && getDatetime(item.updateTime)
      }}</span>
      <SvgIcon
        :width="18"
        :height="18"
        hover
        icon="lets-icons:dell"
        @click="emit('on-remove', item.id)"
      ></SvgIcon>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores"
import { SvgIcon } from "@/components/common"

const chatStore = useChatStore()
const emit = defineEmits(["on-remove"])
const props = defineProps({
  active: Boolean,
  item: Object,
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
      color: #c2c1c1;
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
        color: #eeeeee;
      }
    }
  }
}
</style>
