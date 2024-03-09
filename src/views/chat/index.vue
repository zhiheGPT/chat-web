<template>
  <div class="chat">
    <ChatContainer></ChatContainer>
  </div>
</template>

<script setup>
import ChatContainer from '@/components/chat-container/index.vue'
</script>
<style lang="scss" scoped>
.chat {
  height: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 0 10px;
  overflow: auto;
}
</style>
