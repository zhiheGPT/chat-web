<template>
  <div :class="['z-button', customClass]">
    <template v-if="loading">
      <el-icon><Loading /></el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span
      v-if="$slots.default"
      class="text"
      :class="[icon || $slots.icon ? 'ml4' : '']"
    >
      <slot />
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps({
  type: String,
  size: String,
  loading: Boolean,
  icon: String
})

const customClass = ref('')
onMounted(() => {
  const typeClass = props.type ? `z-button--${props.type} ` : ''
  const sizeClass = props.size ? ` z-button--${props.size}` : ''
  customClass.value = `${typeClass}${sizeClass}`
})

computed(() => {
  return props.type ? `z-button-${props.type}` : ''
})
</script>
<style lang="scss" scoped>
.z-button {
  box-sizing: border-box;
  max-width: max-content;
  padding: 10px 20px;
  font-size: 14px;
  background: #ffffff;
  color: #6f6f6f;
  border-radius: 8px;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  &:hover {
    filter: brightness(0.95);
  }

  &--info {
    background: #f4f6f9;
    color: #6f6f6f;
  }
  &--primary {
    background: #246de5;
    color: #ffffff;
  }
  &--error {
    background: #d44c4c;
    color: #ffffff;
  }
  &--warning {
    background: #da7047;
    color: #ffffff;
  }
  &--success {
    background: #37a93c;
    color: #ffffff;
  }

  &--small {
    padding: 5px 10px;
    font-size: 12px;
  }

  .text {
    display: inline-block;
  }
}
</style>
