'use client';

import { FormFileUpload } from '@/components/forms/form-file-upload';
import { FormInput } from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import { FormTextarea } from '@/components/forms/form-textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Product } from '../models/product';
import { resolveActionResult } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { addProduct } from '../actions/add-product';
import { updateProduct } from '../actions/update-product';
import { useMutation } from '@tanstack/react-query';
import {
  addProductSchema,
  AddProductSchema
} from '../actions/add-product-schema';
import { UpdateProductSchema } from '../actions/update-product-schema';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';

export default function ProductForm({
  initialData,
  pageTitle,
  productId
}: {
  initialData: Product | null;
  pageTitle: string;
  productId: string;
}) {
  const form = useZodForm({
    schema: addProductSchema,
    mode: 'all',
    defaultValues: {
      image: undefined,
      name: initialData?.name || '',
      category: initialData?.category || '',
      price: initialData?.price || 0,
      description: initialData?.description || ''
    }
  });
  const canSubmit = !form.formState.isSubmitting && form.formState.isValid;

  const router = useRouter();

  const isEditMode = productId !== 'new';

  const { mutate: addMutation, isPending: isAdding } = useMutation({
    mutationFn: async (data: AddProductSchema) => {
      return resolveActionResult(addProduct(data));
    },
    onSuccess: (data) => {
      const count = Array.isArray(data) ? data.length : 1;
      toast.success(`${count} product(s) added successfully`);
      router.push('/dashboard/product');
    },
    onError: (error) => {
      toast.error(`No se pudieron agregar los campos: ${error}`);
    }
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: async (data: UpdateProductSchema) => {
      return resolveActionResult(updateProduct(data));
    },
    onSuccess: () => {
      toast.success('Product updated successfully');
      router.push('/dashboard/product');
    },
    onError: (error) => {
      toast.error(`No se pudo actualizar el producto: ${error}`);
    }
  });

  const isPending = isAdding || isUpdating;

  const onSubmit: SubmitHandler<AddProductSchema> = async (data) => {
    if (!canSubmit) {
      return;
    }

    if (isEditMode && initialData) {
      const updateData: UpdateProductSchema = {
        id: initialData.id,
        ...data,
        image: data.image
      };
      updateMutation(updateData);
    } else {
      addMutation(data);
    }
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormFileUpload
            control={form.control}
            name='image'
            label='Product Image'
            description='Upload a product image'
            config={{
              maxSize: 5 * 1024 * 1024,
              maxFiles: 4
            }}
          />

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormInput
              control={form.control}
              name='name'
              label='Product Name'
              placeholder='Enter product name'
              required
            />

            <FormSelect
              control={form.control}
              name='category'
              label='Category'
              placeholder='Select category'
              required
              options={[
                {
                  label: 'Beauty Products',
                  value: 'beauty'
                },
                {
                  label: 'Electronics',
                  value: 'electronics'
                },
                {
                  label: 'Home & Garden',
                  value: 'home'
                },
                {
                  label: 'Sports & Outdoors',
                  value: 'sports'
                }
              ]}
            />

            <FormInput
              control={form.control}
              name='price'
              label='Price'
              placeholder='Enter price'
              required
              type='number'
              min={0}
              step='0.01'
            />
          </div>

          <FormTextarea
            control={form.control}
            name='description'
            label='Description'
            placeholder='Enter product description'
            required
            config={{
              maxLength: 500,
              showCharCount: true,
              rows: 4
            }}
          />

          <Button type='submit' disabled={isPending}>
            {isPending
              ? isEditMode
                ? 'Updating Product...'
                : 'Adding Product...'
              : isEditMode
                ? 'Update Product'
                : 'Add Product'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
