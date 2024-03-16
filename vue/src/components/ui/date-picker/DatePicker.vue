<script setup lang="ts">
import { format } from 'date-fns'

import { ref } from 'vue'
import Button from '../button/Button.vue'
import Calendar from '../calendar/Calendar.vue'
import Popover from '../popover/Popover.vue'
import PopoverContent from '../popover/PopoverContent.vue'
import PopoverTrigger from '../popover/PopoverTrigger.vue'

const date = ref<Date>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-full pl-3 !justify-start text-left font-normal"
        :class="[!date && 'text-muted-foreground']"
      >
        <!-- <i class="i-solar-calendar-minimalistic-outline mr-2 h-4 w-4" /> -->
        {{ date ? format(date, "yyyy-MM-dd") : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" />
    </PopoverContent>
  </Popover>
</template>
