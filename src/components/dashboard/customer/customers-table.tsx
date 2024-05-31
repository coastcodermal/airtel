'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection';
import type { CustomerType } from '@/types/customer';

function noop(): void {
  // do nothing
}

export function CustomersTable(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const [rows, setRows] = React.useState<CustomerType[]>([]);
  const [loading, setLoading] = React.useState(true);

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && (selected?.size ?? 0) === rows.length;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          const data: CustomerType[] = await response.json();
          const paginatedCustomers = Array.isArray(data) ? applyPagination(data, page, rowsPerPage) : [];
          setRows(paginatedCustomers);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
              <TableCell>Expiry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id) ?? false;

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.routers.account_no}</TableCell>
                  <TableCell>
                    {row.city}, {row.town}, Kenya
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{dayjs(row.subscriprion_date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{dayjs(row.expiry).format('MMM D, YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={rows.length}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

function applyPagination(rows: CustomerType[], page: number, rowsPerPage: number): CustomerType[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
