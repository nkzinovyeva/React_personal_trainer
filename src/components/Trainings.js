import React, {useState, useEffect, useRef} from "react";
import { AgGridReact } from "ag-grid-react";
import {Snackbar, IconButton, Tooltip} from "@material-ui/core";
import * as moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

/*
* Trainings page
*/
function Traininglist() {
    
    //set constants
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, []);

    const handleClose = () => {
        setOpen(false)
    };

    //get trainings from the database
    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };
    
    //delete training
    const deleteTraining = (id) => {
            //console.log(id)
        if (window.confirm("Are you sure?")) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, { 
                    method: "DELETE" })
            .then((_) => getTrainings())
            .then((_) => {
                setMsg("Training deleted");
                setOpen(true);
            })
            .catch((err) => console.error(err));
        };
    };

    //set columns for the table
    const columns = [
            {headerName: "Activity", field: "activity", sortable: true, filter: true },
            {headerName: "Duration", field: "duration", sortable: true, filter: true, width: 120 },
            {headerName: "Date", 
                valueGetter: function date(params) {
                    return moment(params.data.date).format("MMMM Do YYYY, h:mm")
                },
            sortable: true, 
            filter: true 
            },
            {headerName: "Customer",
                valueGetter: function customer(params) {
                    return params.data.customer.firstname + " " + params.data.customer.lastname
                },
            sortable: true, 
            filter: true  
            },
            {width: 80,
                headerName: "", 
                field: "id", 
                cellRendererFramework: params => <Tooltip title="Delete training">
                                                    <IconButton variant="text" 
                                                            color="secondary" 
                                                            size="small" 
                                                            aria-label="delete"
                                                            onClick = {() => deleteTraining(params.value)} >
                                                                <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
            }, 
    ];
 
    return (
        <div className="Body">
            <div className = "ag-theme-material" style ={{height: "700px", width: "95%", margin: "auto"}}>
                <AgGridReact 
                    ref = {gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    suppressCellSelection = {true}
                    columnDefs = {columns}
                    rowData = {trainings}
                    pagination = {true}
                    paginationPageSize = {10}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
            </div>
        </div>
    );

};

export default Traininglist;