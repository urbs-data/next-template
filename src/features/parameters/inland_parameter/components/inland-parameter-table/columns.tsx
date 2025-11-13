'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type InlandParameter = {
  id: number;
  inland_type: string | null;
  port: string | null;
  country: string | null;
  start_date: string | null;
  end_date: string | null;
  zip_code: number | null;
  value: number | null;
  cost_group: string | null;
  user: string | null;
};

export const columns: ColumnDef<InlandParameter>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<InlandParameter['id']>()}</div>
  },
  {
    id: 'inland_type',
    accessorKey: 'inland_type',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Inland Type' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<InlandParameter['inland_type']>()}</div>
    )
  },
  {
    id: 'port',
    accessorKey: 'port',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Port' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<InlandParameter['port']>()}</div>
  },
  {
    id: 'country',
    accessorKey: 'country',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<InlandParameter['country']>()}</div>
  },
  {
    id: 'start_date',
    accessorKey: 'start_date',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Start Date' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<InlandParameter['start_date']>();
      return <div>{new Date(value as string).toLocaleDateString()}</div>;
    }
  },
  {
    id: 'end_date',
    accessorKey: 'end_date',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='End Date' />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<InlandParameter['end_date']>();
      return <div>{new Date(value as string).toLocaleDateString()}</div>;
    }
  },
  {
    id: 'zip_code',
    accessorKey: 'zip_code',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Zip Code' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<InlandParameter['zip_code']>()}</div>
    )
  },
  {
    id: 'value',
    accessorKey: 'value',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Value' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<InlandParameter['value']>()?.toLocaleString()}</div>
    )
  },
  {
    id: 'cost_group',
    accessorKey: 'cost_group',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='Cost Group' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<InlandParameter['cost_group']>()}</div>
    )
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: ({ column }: { column: Column<InlandParameter, unknown> }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<InlandParameter['user']>()}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
