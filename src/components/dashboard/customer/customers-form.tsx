// CustomerForm.tsx
import * as React from 'react';
import { useFormik, type FormikProps } from 'formik';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { type FormValues } from '@/types/FormValue';
import { validationSchema } from '@/utils/helper/ValidationSchema';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

interface CustomerFormProps {
    onSubmit: (values: FormValues) => void;
}

export function CustomerForm({ onSubmit }: CustomerFormProps): React.JSX.Element {
    const formik: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            city: '',
            package: '',
            subscription_date: null,
            expiry: '',
            routerId: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name ? Boolean(formik.errors.name) : undefined}
                            helperText={formik.touched.name ? formik.errors.name : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone ? Boolean(formik.errors.phone) : undefined}
                            helperText={formik.touched.phone ? formik.errors.phone : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email ? Boolean(formik.errors.email) : undefined}
                            helperText={formik.touched.email ? formik.errors.email : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city ? Boolean(formik.errors.city) : undefined}
                            helperText={formik.touched.city ? formik.errors.city : null}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="package-label">Package</InputLabel>
                        <Select
                            fullWidth
                            labelId="package-label"
                            id="package"
                            name="package"
                            value={formik.values.package}
                            onChange={formik.handleChange}
                            error={formik.touched.package ? Boolean(formik.errors.package) : undefined}
                        >
                            <MenuItem value="3500">3,500</MenuItem>
                            <MenuItem value="5500">5,500</MenuItem>
                            <MenuItem value="7500">7,500</MenuItem>
                        </Select>
                        {formik.touched.package && formik.errors.package ? (
                            <FormHelperText error>{formik.errors.package}</FormHelperText>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="subscription_date"
                            name="subscription_date"
                            label="Subscription Date"
                            type="date"
                            value={formik.values.subscription_date ? formik.values.subscription_date.toISOString().split('T')[0] : ''}
                            onChange={(event) => formik.setFieldValue('subscription_date', event.target.value ? new Date(event.target.value) : null)}
                            error={formik.touched.subscription_date ? Boolean(formik.errors.subscription_date) : undefined}
                            helperText={formik.touched.subscription_date ? formik.errors.subscription_date : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button type="submit" disabled={!formik.isValid}>Select Router</Button>        </DialogActions>
        </form>
    );
}