'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import Link from 'next/link';
import { navItems } from '@/constants/data';
import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';

export default function ParametersPage() {
  const parametersItem = navItems.find((item) => item.title === 'Parameters');
  const parameterSubItems = parametersItem?.items ?? [];

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <Heading
            title='Parámetros de Negocio'
            description='Gestión de Parámetros para cálculo de costos'
          />
        </div>

        <Separator />

        {/* Grid de Cards */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {parameterSubItems.map((item, idx) => {
            const Icon =
              Icons[item.icon as keyof typeof Icons] ?? Icons.dashboard;

            return (
              <Card
                key={idx}
                className='group cursor-pointer transition-shadow duration-300 hover:shadow-lg'
              >
                <CardHeader className='flex flex-row items-center gap-4'>
                  <div className='bg-muted group-hover:bg-primary/10 rounded-full p-3 transition-colors'>
                    <Icon className='text-muted-foreground group-hover:text-primary h-6 w-6' />
                  </div>
                  <div>
                    <CardTitle className='text-lg font-semibold'>
                      {item.title}
                    </CardTitle>
                    <CardDescription>
                      {item.shortcut?.join(' + ')}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardFooter>
                  <Link
                    href={item.url}
                    className='text-primary text-sm hover:underline'
                  >
                    Ir a {item.title}
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
