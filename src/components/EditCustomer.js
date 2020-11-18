import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function EditCustomer (props) {
  
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      email: props.customer.email,
      phone: props.customer.phone,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city
    })
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  //update handler
  const updateCustomer = () => {
    props.updateCustomer(customer, props.customer.links[0].href);
    handleClose();
  };

  const handleInputChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value})
  };
  
  return (
    <div>
        <Tooltip title="Edit customer">
            <IconButton variant="text" 
                        color="primary" 
                        size="medium" 
                        aria-label="edit" 
                        onClick={handleClickOpen} >
                <EditIcon />
            </IconButton> 
        </Tooltip>
        <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Provide new info for the customer
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={updateCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default EditCustomer;