import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import type { CustomerType } from '@/types/customer';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;


export default async function Page(): Promise<React.JSX.Element> {
  const page = 0;
  const rowsPerPage = 5;

  async function fetchData(): Promise<CustomerType[]> {
    try {
      const response = await fetch('http://localhost:3000/api/customers', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      if (response.status === 200) {
        const data: CustomerType[] = await response.json();
        return data;
      }
      console.error('Error fetching data:', response.status);
      return [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  const data = await fetchData();  
  const paginatedCustomers = Array.isArray(data) ? applyPagination(data, page, rowsPerPage) : [];
  

  return (
    <Grid container spacing={3}>
      <Grid lg={4} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="30" />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid lg={4} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="3" />
      </Grid>
      <Grid lg={12} sm={12} xs={12}>
      <Stack>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customer Records</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
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
        <Traffic chartSeries={[63, 15, 22]} labels={['Cows', 'Bulls', 'Calves']} sx={{ height: '100%' }} />
      </Grid>
      
      
    </Grid>
    
  );
}

function applyPagination(rows: CustomerType[], page: number, rowsPerPage: number): CustomerType[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
