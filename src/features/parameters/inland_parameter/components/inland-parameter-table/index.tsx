'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

interface InlandParameterTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}

export function InlandParameterTable<TData, TValue>({
  data,
  totalItems,
  columns
}: InlandParameterTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500
  });

  // En realidad no son totalItems, deberia tener un nombre mas generico.. pero funciona!
  return <DataTable table={table} totalItems={totalItems} />;
}
