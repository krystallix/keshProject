<template>
    <div class="flex items-center justify-end py-4 space-x-2">
      <DataTablePagination :table="table" />
    </div>
  </template>
  
  <script setup lang="ts">
  import DataTablePagination from '@/components/dataTable/Pagination.vue'
  
  const props = defineProps<{
    table: any
  }>()
  </script>
  