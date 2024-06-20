import type { VNode } from 'vue'

export { default as Table } from './Table.vue'
export { default as TableCell } from './components/TableCell.vue'
export { default as TableHead } from './components/TableHead.vue'
export { default as TableFooter } from './components/TableFooter.vue'
export { default as TableRow } from './components/TableRow.vue'
export { default as TableCaption } from './components/TableCaption.vue'
export { default as TableEmpty } from './components/TableEmpty.vue'

export interface ITableColumnRenderParams {
  row: any
  col: ITableColumn
  idx: number
}

export interface ITableColumn {
  title: string
  field: string

  width?: string | number
  headClass?: string
  cellClass?: string

  renderHead?: (column: ITableColumn) => VNode
  renderCell?: (params: ITableColumnRenderParams) => VNode
}

export interface ConditionItem {
  property: string
  condition: string
  value: string
}
