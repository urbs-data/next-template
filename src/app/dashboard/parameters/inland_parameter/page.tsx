import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ProductListSkeleton from '@/features/products/components/product-list-skeleton';
import { productSearchParamsCache } from '@/features/products/searchparams';
import { serializeProductParams } from '@/features/products/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

import InlandParameterActions from '@/features/parameters/inland_parameter/components/inland-parameter-actions';
import InlandParameterListPage from '@/features/parameters/inland_parameter/components/inland-parameter-list-page';

export const metadata = {
  title: 'Parameters: Inland Parameters'
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
          <Heading
            title='Inland Parameter'
            description='Manage Inland Parameters'
          />
          <InlandParameterActions />
        </div>

        <Separator />

        {/* Input busqueda? */}
        {/* <Suspense fallback={<div className='h-9' />}>
                    <ProductFilters />
                </Suspense> */}

        <Suspense key={key} fallback={<ProductListSkeleton />}>
          <InlandParameterListPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
