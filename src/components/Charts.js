import React, { useState, useEffect } from "react";
import { XAxis, LineChart, Tooltip, CartesianGrid, Line, BarChart, Bar, YAxis } from "recharts";
import "../App.css";

/*
* statistics page
*/
function Stats() {
    
    const [data, setData] = useState([]);
    // Load the full build.
    const _ = require("lodash");
  
    useEffect(() => {
        getTrainings();
    }, []);

    //get trainings from the database
    const getTrainings = () => {
      fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
    };

    //grouping by activity
    const group = _.groupBy(data, "activity");
    
    //summarize duration in the new array
    const sum = _.map(group, (value, key) => ({
        activity: key,
        duration: _.sumBy(value, "duration"),
    }));

    return (
        <div className="Body">
            <div className="row">
                <div className="column">
                    <BarChart
                        width={600}
                        height={400}
                        data= {sum}
                        margin={{top: 5, right: 30,left: 20, bottom: 5}} >
                        <XAxis dataKey="activity" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="duration" fill="lightgreen" />
                    </BarChart>
                </div>
                <div className="column">
                    <LineChart
                        width={600}
                        height={400}
                        data={sum}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }} >
                        <XAxis dataKey="activity" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="duration" stroke="red" yAxisId={2} />
                    </LineChart>
                </div>
            </div>
        </div>
    );         
};

export default Stats;