import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { ArrowUpDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import DropdownAction from '@/components/dataTable/DataTableDropdown.vue';

function capitalizeWords(value: string | null): string {
  if (!value) return '';
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export interface Members {
  id: number;
  number: number;
  name: string;
  rt: string;
  role: string; // Comma-separated roles
  phone_number: string;
}

export const columns: ColumnDef<Members>[] = [
  {
    accessorKey: 'number',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
    },
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('name') as string),
  },
  {
    accessorKey: 'rt',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['RT', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
    },  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Role', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
    },    cell: ({ row }) => {
      const roles = row.getValue('role') as string;
      return h('div', capitalizeWords(roles));
    },
    filterFn: (row, columnId, filterValue) => {

      // Ensure filterValue is a string
      const filterValueStr = Array.isArray(filterValue) ? filterValue[0] : filterValue;
      if (typeof filterValueStr !== 'string') {
        return false;
      }

      // Split the filter value into individual search terms
      const searchTerms = filterValueStr.toLowerCase().split(',').map(term => term.trim());

      // Get the roles from the row and ensure it's a string
      const roleValue = row.getValue(columnId) as string;

      // Split the roleValue into roles
      const roles = roleValue.split(',').map(role => role.trim().toLowerCase());

      // Check if all search terms are in the roles
      return searchTerms.every(term => roles.includes(term));
    },
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const { id, name, rt, role , phone_number} = row.original;
      return h('div', { class: 'relative' }, h(DropdownAction, {
        id,
        name,
        rt,
        role,
        phone_number,
      }));
    },
  },
];
