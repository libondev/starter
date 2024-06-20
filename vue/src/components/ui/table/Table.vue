<script setup lang="ts" generic="D">
import type { HTMLAttributes } from 'vue'
import { h } from 'vue'
import type { ITableColumn, ITableColumnRenderParams } from './index.ts'
import { TableCell, TableEmpty, TableHead, TableRow } from './index.ts'
import FilterData from './components/FilterData.vue'
import { cn } from '@/utils/cls.ts'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    index?: boolean
    data: D[]
    dataKey: string
    columns: ITableColumn[]
    height?: string | number
    maxHeight?: string | number
  }>(),
  {
    index: true,
    dataKey: 'id',
    data: () => [],
    columns: () => [],
  },
)

type ConditionGetter = (v: D) => boolean

const filterConditions = shallowRef<ConditionGetter[]>([])
const filterData = computed(() => {
  return props.data.filter(item => filterConditions.value.every(condition => condition(item)))
})

const formatColumns = computed(() => {
  const columns = [...props.columns]

  if (props.index) {
    columns.unshift({
      title: 'No.',
      field: '__index__',
      width: 50,
      headClass: 'text-center',
      cellClass: 'text-center',
      renderCell: ({ idx }) => h('span', idx + 1),
    })
  }

  return columns
})

// get table height value
function _getCSSUnitValue(value?: string | number) {
  if (!value) {
    return 'auto'
  }

  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

// get unique key for each row
function _getRowKey(row: any) {
  return row[props.dataKey]
}

const _getCellValue = ({ row, col }: ITableColumnRenderParams) => row[col.field]

// update filter conditions
function onFilterData(conditions: ConditionGetter[]) {
  filterConditions.value = conditions
}
</script>

<template>
  <div>
    <div class="mb-2 flex justify-end">
      <FilterData :columns="columns" @filter="onFilterData" />
    </div>

    <div
      class="relative w-full overflow-auto border rounded-md h-[var(--h)] max-h-[var(--h)]"
      :style="{ '--h': _getCSSUnitValue(height), '--mh': _getCSSUnitValue(maxHeight) }"
    >
      <table :class="cn('w-full caption-bottom text-sm', props.class)">
        <thead class="[&_tr]:border-b sticky top-0 bg-background">
          <TableRow>
            <TableHead v-for="th of formatColumns" :key="th.field" :class="th.headClass" :width="th.width">
              <template v-if="th.renderHead">
                <Component :is="th.renderHead(th)" />
              </template>
              <template v-else>
                {{ th.title }}
              </template>
            </TableHead>
          </TableRow>
        </thead>

        <tbody class="[&_tr:last-child]:border-0">
          <template v-if="filterData.length">
            <TableRow v-for="row, idx of filterData" :key="_getRowKey(row)">
              <TableCell v-for="col of formatColumns" :key="col.field" :class="col.cellClass">
                <template v-if="col.renderCell">
                  <Component :is="col.renderCell({ row, col, idx })" />
                </template>
                <template v-else>
                  {{ _getCellValue({ row, col, idx }) }}
                </template>
              </TableCell>
            </TableRow>
          </template>

          <TableEmpty v-else :colspan="formatColumns.length" />
        </tbody>
      </table>
    </div>
  </div>
</template>
