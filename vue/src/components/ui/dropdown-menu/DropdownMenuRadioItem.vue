<script setup lang="ts">
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useEmitAsProps,
} from 'radix-vue'

// import { DotFilledIcon } from '@radix-icons/vue'

const props = defineProps<DropdownMenuRadioItemProps>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    class="flex relative items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-outline-hover pl-7 py-1.5 text-sm outline-none select-none cursor-default"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">

      <DropdownMenuItemIndicator>
        图标图标图标
        <!-- <DotFilledIcon class="h-4 w-4 fill-current" /> -->
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
