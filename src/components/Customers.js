import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from "@material-ui/core/Button";
import AddCustomer from "./AddCustomer"
import EditCustomer from "./EditCustomer"

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    
    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    
    const columns = [
        {headerName: 'First Name', field: 'firstname', sortable: true, filter: true },
        {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true },
        {headerName: 'Email', field: 'email', sortable: true, filter: true },
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        {headerName: 'City', field: 'city', sortable: true, filter: true },
        {   
            headerName: '', 
            field: 'links[0].href', 
            cellRendererFramework: params => <Button 
                                                onClick = {() => deleteCustomer(params)} 
                                                color="secondary" 
                                                size="small" >Delete
                                            </Button>
        },
        {   
            headerName: '', 
            field: 'links[0].href', 
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} customer={params.data}/>
        }    
    ];
    
    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link.data.links[0].href, {
              method: 'DELETE'
            })
            .then(_ => getCustomers() )
            .then(_ => {
                setMsg("Customer deleted")
                setOpen(true)
            })
            .catch(err => console.error(err));
        }
    };

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

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
         .then(_ => getCustomers())
          .then(_ => {
            setMsg("Customer updated");
            setOpen(true);
        })
          .catch((err) => console.log(err));
    };

    return (
        <div>
            <AddCustomer addCustomer = {addCustomer}/>
        <div className = "ag-theme-material" style ={{height: '700px', width: '80%', margin: 'auto'}}>
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
}

export default Customers;

/*<AddTraining addTraining = {addTraining}/>

const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(newCustomer)
    })
    .then(_ => getCustomers())
    .then(_ => setMsg('Customer added succesfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
  }*/