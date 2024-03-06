<template>
  <div class="actions">
    <div class="action-item">
      <div class="left" @click="openAIChat">
        <img src="@/assets/gpt-icon.png" />
        <span>知盒 GPT</span>
      </div>
      <div class="right"></div>
    </div>
    <div class="action-item">
      <div class="left">
        <img :src="userStore.avatar" />
        <span>{{ userStore.nickName }}</span>
      </div>
      <div class="right">
        <el-icon size="18"><MoreFilled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.actions {
  width: 100%;
  .action-item {
    @include flex-layout(row, space-between);
    height: 54px;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: #1a1a1a0d;
    }
    .left {
      @include flex-layout(row, start, center);
      max-width: 80%;
      overflow: hidden;
      gap: 10px;
      img {
        border-radius: 15px;
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
