import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {Snackbar, Tooltip, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./Addtraining";


/*
* customers page
*/
function Customers() {

    //set constants
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    
    //set columns for the table
    const columns = [
        {   
            width: 90,
            headerName: "", 
            field: "links[0].href", 
            cellRendererFramework: params => 
                    <AddTraining addTraining = {addTraining} customer={params.data} />
        },
        {headerName: "First Name", field: "firstname", sortable: true, filter: true, resizable: true },
        {headerName: "Last Name", field: "lastname", sortable: true, filter: true, resizable: true },
        {headerName: "Email", field: "email", sortable: true, filter: true, resizable: true },
        {headerName: "Phone", field: "phone", sortable: true, filter: true, resizable: true },
        {headerName: "Address", field: "streetaddress", sortable: true, filter: true, resizable: true },
        {headerName: "Postcode", field: "postcode", sortable: true, filter: true, resizable: true },
        {headerName: "City", field: "city", sortable: true, filter: true, resizable: true },
        {   
            width: 90,
            headerName: "", 
            field: "links[0].href", 
            cellRendererFramework: params => <Tooltip title="Delete customer">
                                                <IconButton variant="text" 
                                                        color="secondary" 
                                                        size="small" 
                                                        aria-label="delete"
                                                        onClick = {() => deleteCustomer(params)} >
                                                        <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
        },
        {   
            width: 90,
            headerName: "", 
            field: "links[0].href", 
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data}/>
        }    
    ];
    
    //get customers from the database
    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };

    //delete customer
    const deleteCustomer = (link) => {
        if (window.confirm("Are you sure?")) {
            fetch(link.data.links[0].href, {
              method: "DELETE"
            })
            .then(_ => getCustomers() )
            .then(_ => {
                setMsg("Customer deleted")
                setOpen(true)
            })
            .catch(err => console.error(err));
        }
    };

    //add customer
    const addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        })
          .then(_ => getCustomers())
          .then(_ => {
            setMsg("New customer added");
            setOpen(true);
          })
          .catch((err) => console.log(err));
    };

    //update customer
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg("Customer updated");
            setOpen(true);
        })
          .catch((err) => console.log(err));
    };

    //add training for the particular customer
    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        })
        .then(_ => getCustomers())
        .then(_ => {
                setMsg("New training added");
                setOpen(true);
        })
        .catch(err => console.error(err))
    };

    return (
        <div className="Body" >
            <AddCustomer addCustomer = {addCustomer}/>
            <div className = "ag-theme-material" style ={{height: "700px", width: "95%", margin: "auto"}}>
                <AgGridReact 
                    ref = {gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs = {columns}
                    suppressCellSelection = {true}
                    rowData = {customers}
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

export default Customers;