/* import { productSearchParamsCache } from '@/features/products/searchparams'; */
import { HTSTable } from './hts-table';
import { columns } from './hts-table/columns';
import { getHTSCodes } from '../data/get-hts-codes';

type HTSListPage = {};

export default async function HTSListPage({}: HTSListPage) {
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

  const data = await getHTSCodes(/* filters */);
  const totalHTSCodes = data.totalCount;
  const hts_codes = data.htscodes;

  return (
    <HTSTable data={hts_codes} totalItems={totalHTSCodes} columns={columns} />
  );
}
