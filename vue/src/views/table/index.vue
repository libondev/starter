<script setup lang="ts">
import { h } from 'vue'
import type { ITableColumn } from '@/components/ui/table'
import { Table } from '@/components/ui/table'

const columns: ITableColumn[] = [
  {
    title: 'Invoice',
    field: 'invoice',
    renderHead: () => h('div', 'Invoice Number'),
  },
  {
    title: 'Payment Status',
    field: 'paymentStatus',
    renderCell: ({ row }) => h('div', row.paymentStatus + 111111),
  },

  {
    title: 'Total Amount($)',
    field: 'totalAmount',
    cellClass: 'text-right',
    renderCell: ({ row }) => {
      if (row.totalAmount === '250.00') {
        return h('div', `WoW, You spent ${row.totalAmount}.`)
      }

      return h('div', row.totalAmount)
    },
  },
  { title: 'Payment Method', field: 'paymentMethod' },
]

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '300.00',
    paymentMethod: 'Credit Card',
  },
]
</script>

<template>
  <div class="p-4">
    <Table :data="invoices" data-key="invoice" :columns="columns" />
  </div>
</template>
