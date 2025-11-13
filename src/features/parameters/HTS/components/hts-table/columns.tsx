'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { HTSCode } from '@/db/schema';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<HTSCode>[] = [
  {
    id: 'hts_code',
    accessorKey: 'hts_code',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='HTS Code' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['hts_code']>()}</div>
  },
  {
    id: 'hts_category',
    accessorKey: 'hts_category',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='HTS Category' />
    )
  },
  {
    id: 'min_value',
    accessorKey: 'min_value',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Minimum Value' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['min_value']>()}</div>
  },
  {
    id: 'max_value',
    accessorKey: 'max_value',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Maximum Value' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['max_value']>()}</div>
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['type']>()}</div>
  },
  {
    id: 'duty',
    accessorKey: 'duty',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Duty' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['duty']>()}</div>
  },
  {
    id: 'cost_group',
    accessorKey: 'cost_group',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cost Group' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['cost_group']>()}</div>
  },
  {
    id: 'hts_product_subtype',
    accessorKey: 'hts_product_subtype',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='HTS Product Subtype' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<HTSCode['hts_product_subtype']>()}</div>
    )
  },
  {
    id: 'fixed_duty_per_piece',
    accessorKey: 'fixed_duty_per_piece',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Fixed Duty Per Piece' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<HTSCode['fixed_duty_per_piece']>()}</div>
    )
  },
  {
    id: 'notes',
    accessorKey: 'notes',
    header: ({ column }: { column: Column<HTSCode, unknown> }) => (
      <DataTableColumnHeader column={column} title='Notes' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<HTSCode['notes']>()}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
