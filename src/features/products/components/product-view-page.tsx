import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { getProductById } from '../data/get-product-by-id';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    const fetchedProduct = await getProductById({ id: Number(productId) });
    if (!fetchedProduct) {
      notFound();
    }
    product = fetchedProduct;
    pageTitle = `Edit Product`;
  }

  return (
    <ProductForm
      initialData={product}
      pageTitle={pageTitle}
      productId={productId}
    />
  );
}
