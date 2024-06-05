import { type FormValues } from '@/types/FormValue';
import * as yup from 'yup';

export const validationSchema: yup.Schema<FormValues> = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  city: yup.string().required('City is required'),
  package: yup.string().required('Package is required'),
  subscription_date: yup.date().required('Subscription date is required').nullable(),
  expiry: yup.string().default(''),
  router: yup.string().default(''),
});
