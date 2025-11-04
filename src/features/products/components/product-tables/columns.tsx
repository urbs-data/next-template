'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/features/products/models/product';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORIES } from '@/features/products/data/constants';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className='rounded-lg'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search products...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Product['category']>();
      const Icon = status === 'active' ? CheckCircle2 : XCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Category',
      variant: 'multiSelect',
      options: CATEGORIES
    }
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  },
  // columnas de ejemplo para que se vea el scroll horizontal
  {
    id: 'price2',
    accessorKey: 'price',
    header: 'PRICE2'
  },
  {
    id: 'price3',
    accessorKey: 'price',
    header: 'PRICE3'
  },
  {
    id: 'price4',
    accessorKey: 'price',
    header: 'PRICE4'
  },
  {
    id: 'price5',
    accessorKey: 'price',
    header: 'PRICE5'
  },
  {
    id: 'price6',
    accessorKey: 'price',
    header: 'PRICE6'
  },
  {
    id: 'price7',
    accessorKey: 'price',
    header: 'PRICE7'
  },
  {
    id: 'price8',
    accessorKey: 'price',
    header: 'PRICE8'
  }
];
