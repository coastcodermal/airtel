// RouterForm.tsx
import * as React from 'react';
import { useFormik, type FormikProps } from 'formik';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { type FormValues } from '@/types/FormValue';
import { validationSchema } from '@/utils/helper/ValidationSchema';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { FileSearch } from '@phosphor-icons/react/dist/ssr';
import { type RouterType } from '@/types/router';
import Box from '@mui/material/Box';

interface RouterFormProps {
    onSubmit: (values: FormValues) => void;
    values: FormValues;
}

export function RouterForm({ onSubmit, values }: RouterFormProps): React.JSX.Element {
    const [searchResult, setSearchResult] = React.useState<RouterType[]>([]);
    const [selectedRouter, setSelectedRouter] = React.useState<RouterType>();

    const formik: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues: values,
        validationSchema,
        onSubmit,
    });

    const handleSearch = async () => {
        // Perform the search and update the searchResult state variable
        // fetch /api/routers?search=${formik.values.routerId}
        try {
            const response = await fetch(`/api/router?search=${formik.values.routerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                setSearchResult(data);
            } else {
                console.error('Error fetching data:', response.status);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSelect = async (router: RouterType) => {
        setSelectedRouter(router);
        formik.setFieldValue('routerId', router.id);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="routerId"
                            name="routerId"
                            label="Enter router serial no"
                            placeholder="Enter router serial no last 5 digits"
                            value={formik.values.routerId}
                            onChange={formik.handleChange}
                            error={formik.touched.routerId ? Boolean(formik.errors.routerId) : undefined}
                            helperText={formik.touched.routerId ? formik.errors.routerId : null}
                        />
                        <IconButton onClick={handleSearch}>
                            <FileSearch />
                        </IconButton>
                    </Grid>
                    {searchResult.map((router) => (
                        <Grid item xs={12} key={router.id}>
                            
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Checkbox
                                checked={selectedRouter?.id === router.id}
                                onChange={() => { handleSelect(router); }}
                            />
                                <span>{router.serial_no}</span>
                                <span>{router.account_no}</span>
                                <span>{router.router_mobile_no}</span>     
                            </Box>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type="submit" disabled={!selectedRouter}>Select Router</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </form>
    );
}