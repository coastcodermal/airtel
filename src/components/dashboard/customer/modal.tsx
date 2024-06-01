import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalProps {
  open: boolean;
}
export function CustomersModal({open}: ModalProps): React.JSX.Element {
  return (
    <Dialog open={open}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new customer, please enter the customers name, email address, and phone number here.
          </DialogContentText>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            
            
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            
          />
        </DialogContent>
        <DialogActions>
          <Button href='/dashboard/customers/?modal=false'>Cancel</Button>
          {/* <Button onClick={handleSubmit}>Add</Button> */}
        </DialogActions>
      </Dialog>
  );
}

