<template>
  <div class="recommend" v-if="chatStore.file.content">
    <NCollapse>
      <NCollapseItem name="1" title="点击查看大纲">
        <span>{{ chatStore.file.content }}</span>
      </NCollapseItem>
    </NCollapse>
    <!-- <p class="tips">选择以下话题快速与我对话</p>
    <div class="list">
      <div class="item" @click="selectPrompt">
        我想拍一个关于美食的视频，受众是年轻人。
      </div>
      <div class="item">我想拍一个关于美食的视频，受众是年轻人。</div>
      <div class="item">我想拍一个关于美食的视频，受众是年轻人。</div>
    </div> -->
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores"
import { NCollapse, NCollapseItem } from "naive-ui"

const chatStore = useChatStore()
const emit = defineEmits(["select-prompt"])
const selectPrompt = () => {
  emit("select-prompt", "我想拍一个关于美食的视频，受众是年轻人。")
}
</script>
<style lang="scss" scoped>
.recommend {
  font-size: 14px;
  width: 80%;
  background-color: #ecf1fe;
  border-radius: 4px;
  padding: 20px;
  margin: 20px auto;
  .tips {
    color: #1a1a1a66;
    margin-bottom: 10px;
  }
}
.dark {
  .recommend {
    background-color: #1a1a1a;
  }
}
</style>
