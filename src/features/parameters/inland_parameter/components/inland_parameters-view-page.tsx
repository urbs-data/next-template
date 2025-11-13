import { notFound } from 'next/navigation';
import { getInlandParameterId } from '../data/get-inland-parameter-id';
import InlandParameterViewForm from './inland-parameter-view-form';

type InlandParametersViewPageProps = {
  id: number;
};

export default async function InlandParametersViewPage({
  id
}: InlandParametersViewPageProps) {
  const fetchedInlandParameter = await getInlandParameterId({ id: id });

  if (!fetchedInlandParameter) {
    notFound();
  }

  return (
    <InlandParameterViewForm
      initialData={fetchedInlandParameter}
      pageTitle='View Inland Parameter'
    />
  );
}
