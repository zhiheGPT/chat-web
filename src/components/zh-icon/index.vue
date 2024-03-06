<template>
  <div class="zh-icon" :class="{ active }" @click="itemClick">
    <el-tooltip effect="dark" :content="item.label" placement="right">
      <img v-if="item.avatar" :src="item.avatar" />
      <el-icon v-else :size="20"
        ><component :is="item.icon"></component
      ></el-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  active: Boolean,
  item: Object
})
const emit = defineEmits(['on-click'])

const itemClick = () => {
  emit('on-click', props.item)
  props.item.path && router.push(props.item.path)
}
</script>
<style lang="scss" scoped>
.zh-icon {
  @include flex-layout();
  cursor: pointer;
  border-radius: 8px;
  height: 44px;
  width: 44px;
  .el-icon {
    color: #999999;
  }
  img {
    border-radius: 15px;
    width: 25px;
    height: 25px;
  }
  &.active,
  &:hover {
    background-color: #f3f3f3;
    .el-icon {
      color: #000000;
    }
  }
}
</style>
