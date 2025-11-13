import { InlandParameterTable } from './inland-parameter-table';
import { columns } from './inland-parameter-table/columns';
import { getInlandParameters } from '../data/get-inland-parameter';

type InlandParameterListPage = {};

export default async function InlandParameterListPage({}: InlandParameterListPage) {
  /* const page = productSearchParamsCache.get('page');
        const search = productSearchParamsCache.get('name');
        const pageLimit = productSearchParamsCache.get('perPage');
        const categories = productSearchParamsCache.get('category');
        const sortBy = productSearchParamsCache.get('sortBy');
        const sortDirection = productSearchParamsCache.get('sortDirection');

        const filters = {
            page,
            limit: pageLimit,
            ...(search && { search }),
            ...(categories && { category: categories }),
            ...(sortBy && { sortBy }),
            ...(sortDirection && { sortDirection })
        }; */

  const data = await getInlandParameters(/* filters */);
  const totalProducts = data.totalCount;
  const inland_parameters = data.inland_parameters;

  return (
    <InlandParameterTable
      data={inland_parameters}
      totalItems={totalProducts}
      columns={columns}
    />
  );
}
