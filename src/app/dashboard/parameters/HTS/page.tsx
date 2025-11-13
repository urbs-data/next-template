import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { HTSActions } from '@/features/parameters/HTS/components/hts-actions';
import HTSListPage from '@/features/parameters/HTS/components/hts-list-page';
import ProductListSkeleton from '@/features/products/components/product-list-skeleton';
import { productSearchParamsCache } from '@/features/products/searchparams';
import { serializeProductParams } from '@/features/products/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  productSearchParamsCache.parse(searchParams);

  const key = serializeProductParams({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <Heading title='HTS Codes' description='Manage HTS Codes' />
          <HTSActions />
        </div>

        <Separator />

        {/* Input busqueda? */}
        {/* <Suspense fallback={<div className='h-9' />}>
                    <ProductFilters />
                </Suspense> */}

        {/* TABLA HTS */}
        {/* Quiza hacer el Skeleton generico para parameters? */}
        <Suspense key={key} fallback={<ProductListSkeleton />}>
          <HTSListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
