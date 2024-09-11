<template>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Search Name ..."
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)"
      />
      <div class="mx-2">
        <DataTableFacetedFilter v-if="table.getColumn('role')" :column="table.getColumn('role')" title="Roles" :options="roles" />
        <Button
          v-if="isFiltered"
          variant="ghost"
          class="h-8 px-2 lg:px-3"
          @click="table.resetColumnFilters()"
        >
          Reset
          <X class="ml-2 h-4 w-4" />
        </Button>
      </div>
  
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns
            <ChevronDown class="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column: Column<Members, unknown>) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="(value) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Column } from '@tanstack/vue-table'
  import { computed } from 'vue'
  import { X, ChevronDown } from 'lucide-vue-next'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import { roles } from './data/data'
  import type { Members } from './data/columns'
  const props = defineProps<{
    table: any
  }>()
  
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
  </script>
  