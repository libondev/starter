<script lang="ts" setup>
import type { ConditionItem, ITableColumn } from '../index.ts'

const props = defineProps<{
  columns: ITableColumn[]
}>()
const emits = defineEmits(['filter'])

const propertyOptions = props.columns.map(column => ({
  label: column.title,
  value: column.field,
}))

const conditionOptions = [
  { label: '=', value: 'EQ' },
  { label: '>', value: 'GT' },
  { label: '<', value: 'LT' },
  { label: '≥', value: 'GE' },
  { label: '≤', value: 'LE' },
  { label: '∈', value: 'IN' },
  { label: '∉', value: 'EX' },
]

let lastConditions: ConditionItem[] = []
const conditions = ref<ConditionItem[]>([])

// 是否包含不同的条件
function hasConditionDifference() {
  if (conditions.value.length !== lastConditions.length)
    return true

  for (let i = 0; i < conditions.value.length; i++) {
    const condition = conditions.value[i]
    const prevCondition = lastConditions[i]

    if (
      condition.property !== prevCondition.property ||
      condition.condition !== prevCondition.condition ||
      condition.value !== prevCondition.value
    ) {
      return true
    }
  }

  return false
}

// 条件判断函数
function generateGetter({ property, condition, value }: ConditionItem) {
  return (rowData: any) => {
    const rowDataValue = rowData[property]

    if (condition === 'IN')
      return rowDataValue.includes(value)
    else if (condition === 'EX')
      return !rowDataValue.includes(value)
    else if (condition === 'EQ')
      return rowDataValue === value
    else if (condition === 'GT')
      return rowDataValue > value
    else if (condition === 'LT')
      return rowDataValue < value
    else if (condition === 'GE')
      return rowDataValue >= value
    else if (condition === 'LE')
      return rowDataValue <= value
    else
      return true
  }
}

// 开关 popover
async function onFilterPopoverOpen(open: boolean) {
  if (open) {
    if (!conditions.value.length)
      onCreateCondition()

    lastConditions = conditions.value.map(v => structuredClone(toRaw(v)))

    return
  }

  const correctConditions = conditions.value.filter(({ value }) => value)

  setTimeout(() => {
    conditions.value = correctConditions
  }, 300)

  if (hasConditionDifference())
    emits('filter', correctConditions.map(generateGetter))
}

function onCreateCondition() {
  conditions.value.push({
    property: propertyOptions[0].value,
    condition: 'EQ',
    value: '',
  })
}

function onRemoveCondition(conditionIndex: number) {
  conditions.value.splice(conditionIndex, 1)
}
</script>

<template>
  <Popover @update:open="onFilterPopoverOpen">
    <PopoverTrigger as-child>
      <Button variant="outline" class="px-2">
        <i class="i-solar-filter-linear" />
      </Button>
    </PopoverTrigger>

    <PopoverContent align="end" class="p-2 min-w-[430px]">
      <div class="flex items-center justify-between text-sm">
        <span>Filter Data</span>

        <Button variant="outline" class="h-6 p-1" @click="onCreateCondition">
          <i class="i-ph-plus-bold" />
        </Button>
      </div>

      <div v-for="condition, idx of conditions" :key="idx" class="flex items-center gap-1 text-sm mt-1">
        <Select v-model="condition.property">
          <SelectTrigger class="w-40 min-w-40">
            <SelectValue class="truncate" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem v-for="option in propertyOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="condition.condition">
          <SelectTrigger class="w-20 min-w-20">
            <SelectValue class="truncate" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem v-for="option in conditionOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Input v-model="condition.value" class="min-w-32" />

        <Button variant="ghost" class="h-7 p-2" @click="onRemoveCondition(idx)">
          <i class="i-ph-trash-bold text-red-500" />
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
