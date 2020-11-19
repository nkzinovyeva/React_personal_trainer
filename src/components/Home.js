import React from "react";
import { Paper } from '@material-ui/core';


function Home() {

    return (
        <div>
            <Paper style={styles.paperMain}> 
                <div >
                    <h1 style={{color: 'darkblue'}}>Welcome to the fitness app!</h1>
                    <h4>About the project and task</h4>
                    <p>This project is a part of assessment for the Front-End development course at Haaga-Helia UAS.
                    <h4>Task Case:</h4>
                    <p>Personal Trainer company needs a front end app for their customer database. 
                            The database contains info about customers and their training. 
                            They have REST API and documentation that contains all information needed for front end development. 
                            The task is to implement a front end for them. 
                            The app is built with React and components from external libraries are used.
                    </p>
                    <h4>Main features</h4>
                    <p>The fitness app gives the client access to a data storage system for customers and their training sessions. 
                            Implemented functions for adding/deleting a new client and editing its personal data. 
                            Personal training sessions can be conveniently entered for each customer.
                            The list of training sessions for all clients with the ability to edit it is displayed on a separate page. 
                            For the convenience of the client, the function of displaying training sessions on the calendar is implemented. 
                            There is also a feature for collecting statistics on training types and displaying them as visual data. </p>
                    </p><p><br></br></p>
                </div>
            </Paper>
        </div>
    );
}
const styles = {
    paperMain: {
        width: "95%",
        elevation: 2,
        margin: 20
    },
};
export default Home;