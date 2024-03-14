<script setup>
import { computed, useAttrs } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  icon: String,
  hover: Boolean,
});

const attrs = useAttrs();

const bindAttrs = computed(() => {
  return {
    style: attrs.style || "",
    class: attrs.class || "",
  };
});
</script>

<template>
  <Icon
    class="svg-icon"
    :class="{ 'has-hover': props.hover }"
    :icon="icon || ''"
    v-bind="bindAttrs"
  />
</template>
<style lang="scss" scoped>
.svg-icon {
  cursor: pointer;
  color: #999999;
  &.has-hover:hover {
    color: #000000;
  }
}
.dark{
  .svg-icon {
  &.has-hover:hover {
    color: #666666;
  }
}
}
</style>
