'use client';

import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';

import {
  addInlandParameterSchema,
  AddInlandParameterSchema
} from '../actions/add-inland_parameter-schema';
import { addInlandParameter } from '../actions/add-inland_parameter';

export default function InlandParameterNewForm() {
  const form = useZodForm({
    schema: addInlandParameterSchema,
    mode: 'all',
    defaultValues: {
      inland_type: '',
      port: '',
      country: '',
      zip_code: 0,
      value: 0,
      cost_group: ''
      /* user: '' */
    }
  });

  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddInlandParameterSchema) => {
      return resolveActionResult(addInlandParameter(data));
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/dashboard/parameters/inland_parameter');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit: SubmitHandler<AddInlandParameterSchema> = async (data) => {
    if (!canSubmit) return;
    mutate(data);
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Create New Inland Parameter
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormInput
              control={form.control}
              name='inland_type'
              label='Inland Type'
              placeholder='Enter inland type'
            />
            <FormInput
              control={form.control}
              name='port'
              label='Port'
              placeholder='Enter port'
            />
            <FormInput
              control={form.control}
              name='country'
              label='Country'
              placeholder='Enter country'
            />
            {/* <FormInput
              control={form.control}
              name="start_date"
              label="Start Date"
              type="date"
            /> */}
            {/* <FormInput
              control={form.control}
              name="end_date"
              label="End Date"
              type="date"
            /> */}
            <FormInput
              control={form.control}
              name='zip_code'
              label='Zip Code'
              type='number'
            />
            <FormInput
              control={form.control}
              name='value'
              label='Value'
              type='number'
              step='0.01'
            />
            <FormInput
              control={form.control}
              name='cost_group'
              label='Cost Group'
              placeholder='Enter cost group'
            />
            {/* <FormInput
              control={form.control}
              name="user"
              label="User"
              placeholder="Enter user"
            /> */}
          </div>

          <Button type='submit' disabled={isPending}>
            {isPending ? 'Adding Inland Parameter...' : 'Add Inland Parameter'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
