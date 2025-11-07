'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useQueryState } from 'nuqs';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { CATEGORIES } from '@/features/products/data/constants';
import { productSearchParams } from '@/features/products/searchparams';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { useDebouncedQueryState } from '@/hooks/use-debounced-query-state';

export function ProductFilters() {
  const { startTransition } = useTransitionContext();

  const [name, setName] = useDebouncedQueryState(
    'name',
    productSearchParams.name,
    {
      startTransition,
      shallow: false,
      debounceMs: 500
    }
  );

  const [category, setCategory] = useQueryState(
    'category',
    productSearchParams.category.withOptions({
      startTransition,
      shallow: false
    })
  );

  const [page, setPage] = useQueryState(
    'page',
    productSearchParams.page.withOptions({
      startTransition,
      shallow: false
    })
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target?.value || '';
    setName(value || null);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleCategoryChange = (values: string[] | undefined): void => {
    const categoryString =
      values && values.length > 0 ? values.join(',') : null;
    setCategory(categoryString);
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleResetFilters = (): void => {
    setName(null);
    setCategory(null);
    setPage(1);
  };

  const categoryValues = category ? category.split(',') : [];

  const categoryColumn = {
    getFilterValue: () => categoryValues,
    setFilterValue: handleCategoryChange,
    getFacetedUniqueValues: () => new Map()
  };

  const hasActiveFilters = name !== null || category !== null;

  return (
    <div className='flex w-full items-center gap-2'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <Input
          placeholder='Buscar productos...'
          value={name || ''}
          onChange={handleNameChange}
          className='h-9 w-40 lg:w-56'
        />

        <DataTableFacetedFilter
          column={categoryColumn as any}
          title='Categoría'
          options={CATEGORIES}
          multiple={true}
        />

        {hasActiveFilters && (
          <Button
            variant='outline'
            size='sm'
            className='h-9 border-dashed'
            onClick={handleResetFilters}
          >
            <Cross2Icon />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
