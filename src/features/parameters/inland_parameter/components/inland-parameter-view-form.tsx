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
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';

import {
  updateInlandParameterSchema,
  UpdateInlandParameterSchema
} from '../actions/update-inland-parameter-schema';
import { updateInlandParameter } from '../actions/update-inland-parameter';

export default function InlandParameterViewForm({
  initialData,
  pageTitle
}: {
  initialData: any;
  pageTitle: string;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const form = useZodForm({
    schema: updateInlandParameterSchema,
    mode: 'all',
    defaultValues: {
      id: initialData?.id || 0,
      inland_type: initialData?.inland_type || '',
      port: initialData?.port || '',
      country: initialData?.country || '',
      zip_code: initialData?.zip_code || 0,
      value: initialData?.value || 0,
      cost_group: initialData?.cost_group || ''
    }
  });

  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateInlandParameterSchema) => {
      return resolveActionResult(updateInlandParameter(data));
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setIsEditMode(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(`No se pudo actualizar el parámetro: ${error}`);
    }
  });

  const onSubmit: SubmitHandler<UpdateInlandParameterSchema> = async (data) => {
    if (!canSubmit) return;
    mutate(data);
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-left text-2xl font-bold'>
            {pageTitle}
          </CardTitle>
          {!isEditMode && (
            <Button
              variant='outline'
              onClick={() => setIsEditMode(true)}
              className='gap-2'
            >
              <IconEdit className='h-4 w-4' />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isEditMode ? (
          <Form
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormInput
                control={form.control}
                name='id'
                label='ID'
                type='number'
                disabled
              />

              <FormInput
                control={form.control}
                name='inland_type'
                label='Inland Type'
                placeholder='Enter inland type'
                required
              />

              <FormInput
                control={form.control}
                name='port'
                label='Port'
                placeholder='Enter port'
                required
              />

              <FormInput
                control={form.control}
                name='country'
                label='Country'
                placeholder='Enter country'
                required
              />

              <FormInput
                control={form.control}
                name='zip_code'
                label='ZIP Code'
                type='number'
                required
              />

              <FormInput
                control={form.control}
                name='value'
                label='Value'
                type='number'
                step='0.01'
                required
              />

              <FormInput
                control={form.control}
                name='cost_group'
                label='Cost Group'
                placeholder='Enter cost group'
                required
              />
            </div>

            <div className='flex gap-4'>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Updating parameter...' : 'Update Parameter'}
              </Button>

              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsEditMode(false);
                  form.reset();
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <ReadonlyField label='ID' value={initialData.id} />
            <ReadonlyField
              label='Inland Type'
              value={initialData.inland_type}
            />
            <ReadonlyField label='Port' value={initialData.port} />
            <ReadonlyField label='Country' value={initialData.country} />
            <ReadonlyField label='ZIP Code' value={initialData.zip_code} />
            <ReadonlyField label='Value' value={initialData.value} />
            <ReadonlyField label='Cost Group' value={initialData.cost_group} />
            <ReadonlyField label='User' value={initialData.user} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ReadonlyField({
  label,
  value
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium'>{label}</label>
      <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
        {value ?? '—'}
      </div>
    </div>
  );
}
