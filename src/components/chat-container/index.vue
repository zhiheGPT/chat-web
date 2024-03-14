<template>
  <div class="chat_container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="body _message_list">
      <Recommend
        v-if="chatStore.tabIndex == 2"
        @select-prompt="selectPrompt"
      ></Recommend>
      <MsgItem
        :item="{
          role: 'system',
          content: '您好，我是知盒 GPT 快来提问试试吧！'
        }"
        role="gpt"
        position="left"
      ></MsgItem>
      <MsgItem
        v-for="item in chatStore.messageList"
        :key="item"
        :item="item"
        :position="item.role == 'user' ? 'right' : 'left'"
        role="gpt"
      ></MsgItem>
      <!-- v-if="sendRef?.running" -->
      <n-button
        v-if="sendRef?.running"
        class="ml40"
        size="small"
        round
        @click="sendRef?.handleStop"
      >
        停止接收
      </n-button>
    </div>

    <div class="footer">
      <Send
        class="w-full"
        ref="sendRef"
        :messages="messageList"
        @change="msgChange"
        @on-before="beforeSend"
        @on-end="endSend"
      ></Send>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { NButton } from 'naive-ui'
import Header from './Header.vue'
import Send from './Send.vue'
import MsgItem from './MsgItem.vue'
import Recommend from './Recommend.vue'
import { positionDomViewBottom } from '@/utils'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()

const str = ref(
  '当然，以下是用Python编写的冒泡排序算法的代码：\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# 测试代码\narr = [64, 34, 25, 12, 22, 11, 90]\nsorted_arr = bubble_sort(arr)\nprint(sorted_arr)\n```\n\n这段代码实现了冒泡排序算法。首先，我们定义了一个`bubble_sort`函数，它接受一个列表作为输入，并对列表进行冒泡排序。然后，我们使用两个嵌套的循环来比较相邻的元素，并根据需要交换它们的位置。最后，我们返回排序后的列表。\n\n在测试代码中，我们创建了一个包含一些随机数字的列表`arr`，然后调用`bubble_sort`函数对其进行排序，并将排序后的结果打印出来。\n\n希望这段代码能够满足你的需求。如果有任何问题，请随时告诉我。'
)
watch(
  () => chatStore.chat.id,
  (val) => {
    chatStore.initMessage(val)
    positionDomViewBottom()
  }
)

const sendRef = ref()
const selectPrompt = (val) => {
  sendRef.value.setContent(val)
}

const beforeSend = (val) => {
  chatStore.addMessage(val)
  positionDomViewBottom()
}
const endSend = () => {
  chatStore.updateItem('', 'success')
}

const msgChange = (val) => {
  chatStore.updateItem(val)
  positionDomViewBottom()
}
</script>
<style lang="scss" scoped>
.chat_container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: 60px;
  }
  .body {
    margin: 10px 0;
    flex: 1;
    overflow: auto;
  }
  .footer {
    // height: 75px;
  }
}
</style>
