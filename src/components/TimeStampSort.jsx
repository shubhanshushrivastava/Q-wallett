import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export const TimeStampSort = ({ field: {NEWEST, OLDEST}, dataSource, getSortedData, isLoading , message1 , message12 }) => {

    //Initial Data State (set only once)
    const [initialData, setInitialData] = useState(null);
    //Original Data
    const [originalData, setOriginalData] = useState([]);
    //Sorting Type
    const [sortType, setSortType] = useState("Sort By");
    // console.log(message1,"message");

    useEffect(()=>{
        if(message1 != ""){
            setSortType(message1)
        }
    },[message1 , message12])


    useEffect(() => {
        //setting loading state to true
        isLoading(true);
        //Setting Initial Data once data is available (We will not change it after)
        if (initialData === null && dataSource && dataSource.length > 0) {
            setInitialData(dataSource);
        }
        //Original Data that comes from parent
        setOriginalData(dataSource);
        //Sending the Sorted Data back to parent
        //On first load we send same data back
        getSortedData(dataSource);

        //Setting loading state to false
        if (dataSource && dataSource.length > 0) {
            isLoading(false);
        }

    }, [dataSource])

    useEffect(() => {
        //NEWEST SORTING
        if (sortType === "NEWEST" && NEWEST && originalData.length > 0) {

            //Sorting logic based on user provided date field
            getSortedData([...originalData].sort((a, b) => b[NEWEST] - a[NEWEST]));
            return;
        }

        //OLDEST SORTING
        if (sortType === "OLDEST" && OLDEST && originalData.length > 0) {

            //Sorting logic based on user provided date field
            getSortedData([...originalData].sort((a, b) => a[OLDEST] - b[OLDEST]));
            return;
        }

        if (sortType === "Sort By") {
            
            //If default case then we send back that initial data
            //that we stored on initial load
            getSortedData(initialData);
            return;
        }

    }, [sortType])

    return (
        <div className="input-group-append apart">
        <Dropdown onSelect={(e)=>setSortType(e)}>
        <Dropdown.Toggle >
            {sortType === "Sort By" ? "Sort By" : sortType }
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {NEWEST && <Dropdown.Item eventKey="NEWEST">Newest</Dropdown.Item>}
            {OLDEST && <Dropdown.Item eventKey="OLDEST">Oldest</Dropdown.Item>}
        </Dropdown.Menu>
        </Dropdown>
        </div>
    )
}
