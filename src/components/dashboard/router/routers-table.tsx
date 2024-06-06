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
import CircularProgress from '@mui/material/CircularProgress';
import {type RouterType } from '@/types/router';

export function RoutersTable(): React.JSX.Element {
  const [page , setPage] = React.useState(0); 
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // [1, 5, 10, 25
  const [rows, setRows] = React.useState<RouterType[]>([]);
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
        const response = await fetch('/api/router', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          const data: RouterType[] = await response.json();
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
  }, [page, rowsPerPage]);

  if (loading) {
    return <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>;
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
              <TableCell>Mobile No</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>In Store</TableCell>
              <TableCell>Dated Added</TableCell>
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
                      <Typography variant="subtitle2">{row.router_mobile_no}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.serial_no}</TableCell>
                  <TableCell>
                    {row.in_store ? (
                      <Typography variant="subtitle2" color="success">
                        Yes
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2" color="error">
                        No
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{dayjs(row.created_at).format('MMM D, YYYY')}</TableCell>
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
        onPageChange={(event, newPage) => { setPage(newPage); }}
        onRowsPerPageChange={(event) => {setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

function applyPagination(rows: RouterType[], page: number, rowsPerPage: number): RouterType[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
