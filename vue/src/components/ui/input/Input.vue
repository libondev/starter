<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  loading?: boolean
  disabled?: boolean
  class?: string
  modelValue?: string
  inputClass?: string
  defaultValue?: string
}>()

const emits = defineEmits(['update:modelValue'])

const modelValue = computed({
  get() {
    return props.modelValue || props.defaultValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})
</script>

<template>
  <div class="relative w-full" :class="props.class">
    <input
      v-model="modelValue"
      type="text"
      :name="$attrs.name as string"
      class="inline-flex h-8 w-full rounded-md border border-input disabled:bg-secondary focus:border-primary bg-transparent pl-3 py-1 text-sm shadow-sm truncate file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      :class="[props.inputClass, loading ? 'pr-8' : 'pr-3']"
      :disabled="loading || disabled"
      v-bind="$attrs"
    >
    <span v-if="loading" class="absolute h-full right-2 top-0 inline-flex items-center">
      <i class="i-solar-refresh-broken animate-spin pointer-events-none text-primary" />
    </span>
  </div>
</template>
