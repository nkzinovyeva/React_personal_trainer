import React from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, Tooltip, 
    DialogContentText, DialogTitle, IconButton}  from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"; 
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

/*
* add training modal
*/
function AddTraining(props) {
    
    //set constants
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: "",
        date: "",
        duration: "",
        customer: props.customer.links[0].href
    });
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = event => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };
    
    const handleSave = () => {
        props.addTraining(training);
        handleClose()
    };
      
    return (
        <div>
            <Tooltip title="Add training">
                <IconButton color="primary" 
                            aria-label="Add training"
                            variant="outlined"
                            onClick={handleClickOpen} >
                    <FitnessCenterIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new Training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new training provide the info.
                    </DialogContentText>
                
                    <TextField
                        autoFocus
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        id="activity"
                        label="Activity"
                        fullWidth
                    />

                    <TextField
                        name="date"
                        type="datetime-local"
                        value={training.date}
                        onChange={inputChanged}
                        margin="dense"
                        id="date"
                        fullWidth
                    />
                    <TextField
                        name="duration"
                        type="number"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        id="duration"
                        label="Duration"
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

export default AddTraining;