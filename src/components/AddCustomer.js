import React, {useState} from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, Tooltip, 
  DialogContentText, DialogTitle, IconButton}  from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

/*
* add customer modal
*/
function AddCustomer(props) {

  //set constants  
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

	const handleInputChange = event => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };
    
  const handleSave = () => {
    props.addCustomer(customer);
    handleClose()
  };

  return (
    <div> 
      <Tooltip title="Add a new customer" >
            <IconButton variant="contained"
                        color="primary" 
                        size="small" 
                        aria-label="Add a new customer" 
                        onClick={handleClickOpen} > Add customer
                <PersonAddIcon />  
            </IconButton> 
        </Tooltip>
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
                onChange = {handleInputChange}
                margin="dense"
                label="First name"
                fullWidth
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                onChange = {handleInputChange}
                margin="dense"
                label="Last name"
                fullWidth
            />
            <TextField
                name="email"
                value={customer.email}
                onChange = {handleInputChange}
                margin="dense"
                label="Email"
                fullWidth
            />
            <TextField
                name="phone"
                value={customer.phone}
                onChange = {handleInputChange}
                margin="dense"
                label="Phone"
                fullWidth
            />
            <TextField
                name="streetaddress"
                value={customer.streetaddress}
                onChange = {handleInputChange}
                margin="dense"
                label="Street address"
                fullWidth
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                onChange = {handleInputChange}
                margin="dense"
                label="Post code"
                fullWidth
            />
            <TextField
                name="city"
                value={customer.city}
                onChange = {handleInputChange}
                margin="dense"
                label="City"
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
};

export default AddCustomer;