import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function AddCustomer(props) {
    const [open, setOpen] = useState(false);
	const [customer, setCustomer] = useState({
		firstname: "",
		lastname: "",
		streetaddress: "",
		postcode: "",
		city: "",
		email: "",
		phone: ""
    });
    
    const handleClickOpen = () => {
        setOpen(true);
      };
     
    const handleClose = () => {
		setOpen(false);
	};

	const inputChanged = event => {
		setCustomer({ ...customer, [event.target.name]: event.target.value });
    };
    
    const handleSave = () => {
        props.addCustomer(customer);
        handleClose()
    };

    return (
        <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new customer provide the info.
          </DialogContentText>
            <TextField
                autoFocus
                name="firstname"
                value={customer.firstname}
                onChange = {inputChanged}
                margin="dense"
                label="First name"
                fullWidth
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                onChange = {inputChanged}
                margin="dense"
                label="Last name"
                fullWidth
            />
            <TextField
                name="streetaddress"
                value={customer.streetaddress}
                onChange = {inputChanged}
                margin="dense"
                label="Street address"
                fullWidth
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                onChange = {inputChanged}
                margin="dense"
                label="Post code"
                fullWidth
            />
            <TextField
                name="city"
                value={customer.city}
                onChange = {inputChanged}
                margin="dense"
                label="City"
                fullWidth
            />
            <TextField
                name="email"
                value={customer.email}
                onChange = {inputChanged}
                margin="dense"
                label="Email"
                fullWidth
            />
            <TextField
                name="phone"
                value={customer.phone}
                onChange = {inputChanged}
                margin="dense"
                label="Phone"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default AddCustomer;
