// Importing necessary libraries and components
import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';


// Importing local components and utilities
import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { checkShowModal, getTotalCustomers } from '@/utils/helper';
import { CustomersModal } from '@/components/dashboard/customer/modal';

// Setting up metadata for the page
export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

// Defining props for the page
interface PageProps {
  searchParams?: Record<string, string> | null | undefined;
}

// Main page component
export default async function Page({searchParams}: PageProps): Promise<React.JSX.Element> {

    // Determine if modal should be shown based on search parameters
  const showModal = searchParams? checkShowModal(searchParams) : false;

    // Fetch total customers
  const value = await getTotalCustomers();

    // Render the page
  return (
    <Grid container spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value={value}/>
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="3" />
      </Grid>
      <Grid lg={12} sm={12} xs={12}>
      <Stack>
        <CustomersFilters />
        <CustomersTable/>
      </Stack>
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[15, 22]} labels={['Subscribed', 'Sleeping']} sx={{ height: '100%' }} />
      </Grid>

      {showModal ? <CustomersModal open={showModal} /> : null}
      
      
    </Grid>
    
  );
}


