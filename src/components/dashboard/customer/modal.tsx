'use client';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { type FormValues } from '@/types/FormValue';
import { CustomerForm } from './customers-form';
import { RouterForm } from './router-select-form';

interface ModalProps {
  open: boolean;
  close?: () => void;
}

export function CustomersModal({ open, close }: ModalProps): React.JSX.Element {
  const [isCustomerFormSubmitted, setCustomerFormSubmitted] = React.useState(false);
  const [values, setValues] = React.useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    city: '',
    package: '',
    subscription_date: null,
    expiry: '',
    routerId: '',
  });

  const handleCustomerSubmit = (data: FormValues) => {
    console.log(data);
    setValues(data);
    setCustomerFormSubmitted(true);
  };
  const handleRouterSubmit = (data: FormValues) => {
    console.log(data);
    // post form data to /api/customers
    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        if (close) close();
      }
    })
    .catch((error: unknown) => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Add Customer</DialogTitle>
      {!isCustomerFormSubmitted ? (
        <CustomerForm onSubmit={handleCustomerSubmit} />
      ) : (
        <RouterForm onSubmit={handleRouterSubmit} values={values} />
      )}
    </Dialog>
  );
}
