import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewSkeleton from '@/features/products/components/product-view-skeleton';
import InlandParametersViewPage from '@/features/parameters/inland_parameter/components/inland_parameters-view-page';

export const metadata = {
  title: 'Dashboard : View Product'
};

type PageProps = { params: Promise<{ id: number }> };

export default async function Page(props: PageProps) {
  const params = await props.params;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<ProductViewSkeleton />}>
          <InlandParametersViewPage id={params.id} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
