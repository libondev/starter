<script setup lang="ts">
import { type Calendar, DatePicker } from 'v-calendar'
import { computed, nextTick, onMounted, ref } from 'vue'
import { VARIANTS } from '../button'

defineOptions({
  inheritAttrs: false,
})

withDefaults(
  defineProps<{
    modelValue?: string | number | Date | Partial<{ start: Date, end: Date }>
    modelModifiers?: object
    columns?: number
    type?: 'single' | 'range'
  }>(),
  {
    type: 'range',
    columns: 1,
  },
)

const modelValue = defineModel()

const datePicker = ref<InstanceType<typeof DatePicker>>()
// @ts-expect-error in this current version of v-calendar has the calendaRef instance, which is required to handle arrow nav.
const calendarRef = computed<InstanceType<typeof Calendar>>(() => datePicker.value.calendarRef)

function handleNav(direction: 'prev' | 'next') {
  if (!calendarRef.value)
    return

  if (direction === 'prev')
    calendarRef.value.movePrev()
  else calendarRef.value.moveNext()
}

onMounted(async () => {
  await nextTick()
  if (modelValue.value instanceof Date && calendarRef.value)
    calendarRef.value.focusDate(modelValue.value)
})
</script>

<template>
  <div class="relative">
    <div class="absolute top-3 flex justify-between w-full px-4">
      <button class="inline-flex items-center justify-center rounded-md text-[0.875rem] font-medium select-none focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" :class="[VARIANTS.outline]" @click="handleNav('prev')">
        <i class="i-solar-alt-arrow-left-outline w-4 h-4" />
      </button>
      <button class="inline-flex items-center justify-center rounded-md text-[0.875rem] font-medium select-none focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" :class="[VARIANTS.outline]" @click="handleNav('next')">
        <i class="i-solar-alt-arrow-right-outline w-4 h-4" />
      </button>
    </div>

    <DatePicker
      ref="datePicker"
      v-bind="$attrs"
      v-model="modelValue"
      :model-modifiers="modelModifiers"
      class="calendar"
      trim-weeks
      :mode="type"
      transition="none"
      :columns="columns"
    />
  </div>
</template>

<style lang="postcss">
.calendar {
  @apply p-3 text-center;
}
.calendar .vc-pane-layout {
  @apply grid gap-4;
}
.calendar .vc-title {
  @apply text-sm font-medium pointer-events-none;
}
.calendar .vc-pane-header-wrapper {
  @apply hidden;
}
.calendar .vc-weeks {
  @apply mt-4;
}
.calendar .vc-weekdays {
  @apply flex;
}
.calendar .vc-weekday {
  @apply text-muted-foreground rounded-md w-8 font-normal text-[0.8rem];
}
.calendar .vc-weeks {
  @apply w-full space-y-2 flex flex-col [&>_div]:grid [&>_div]:grid-cols-7;
}
.calendar .vc-day:has(.vc-highlights) {
  /* @apply bg-accent first:rounded-l-md last:rounded-r-md overflow-hidden; */
  @apply  bg-accent first:rounded-l-md last:rounded-r-md overflow-hidden;
}
.calendar .vc-day-content  {
  @apply text-center text-sm p-0 relative focus-within:relative focus-within:z-20 inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-8 w-8 font-normal aria-selected:opacity-100 select-none;
}
.calendar .vc-day-content:not(.vc-highlight-content-light) {
  @apply rounded-md;
}
.calendar .is-not-in-month:not(:has(.vc-highlight-content-solid)):not(:has(.vc-highlight-content-light)):not(:has(.vc-highlight-content-outline)),
.calendar .vc-disabled {
  @apply text-muted-foreground opacity-50;
}
.calendar .vc-highlight-content-solid, .calendar .vc-highlight-content-outline {
  @apply bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground;
}
.calendar .vc-highlight-content-light {
  @apply bg-accent text-accent-foreground;
}
</style>
