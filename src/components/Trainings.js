import React, {useState, useEffect, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import * as moment from "moment";
import AddTraining from "./AddTraining"
 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, []);

    const handleClose = () => {
        setOpen(false)
    }

    const columns = [
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        {   
            headerName: 'Date', 
            field: 'date',
            cellRenderer: (row) =>
                moment.utc(row.date).format('LLL'),
            sortable: true, 
            filter: true },
        
        {
            headerName: "Customer",
            field: "links[2].href",
            cellRenderer: (row) => row.data.links[2].href.firstname,
            
        },
        
    ];

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    /*const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
          fetch(link, {
            method: 'DELETE'
          })
          .then(_ => getCars())
          .then(_ => setMsg('Car was deleted succesfully'))
          .then(_ => setOpen(true))
          .catch(err => console.error(err))
        }
      }*/

    const addTraining = training => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        })
            .then(_ => {
                setMsg("New training added");
            })
            .catch(err => console.error(err))
    };

    return (
        <div>
            <AddTraining addTraining = {addTraining}/>
        <div className = "ag-theme-material" style ={{height: '700px', width: '80%', margin: 'auto'}}>
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
}

export default Traininglist;

/*{   
            headerName: '', 
            width: 90,
            field: '_links.self.href', 
            cellRendererFramework: params => <Button 
                                                color="secondary"
                                                size="small"                                        
                                                onClick = {() => deleteCar(params.value)}>Delete
                                            </Button>
        } */