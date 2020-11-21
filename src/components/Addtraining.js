import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import Tooltip from "@material-ui/core/Tooltip";
 
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


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