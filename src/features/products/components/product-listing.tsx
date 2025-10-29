import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';
import { testAction } from '../actions/test';
import { getProducts } from '../data/get-products';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { category: categories })
  };

  const data = await getProducts(filters);
  const totalProducts = data.totalCount;
  const products = data.products;

  await testAction({ name: 'John Doe' });

  return (
    <ProductTable
      data={products}
      totalItems={totalProducts}
      columns={columns}
    />
  );
}
