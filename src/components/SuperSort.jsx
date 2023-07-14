import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export const SuperSort = ({ field: { A_Z, Z_A, HIGH_TO_LOW, LOW_TO_HIGH, NEWEST, OLDEST ,High_TO_Low ,Low_TO_High }, dataSource, getSortedData, isLoading , message1 , message12 }) => {

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
        //ALPHABETICAL (A-Z) SORTING
        if (sortType === "A_Z" && A_Z && originalData.length > 0) {

            //Sorting logic based on user provided field
            getSortedData([...originalData].sort((a, b) => a[A_Z].localeCompare(b[A_Z])));
            return;
        }

        //ALPHABETICAL REVERSE (Z-A) SORTING
        if (sortType === "Z_A" && Z_A && originalData.length > 0) {

            //Sorting logic based on user provided field
            getSortedData([...originalData].sort((a, b) => b[Z_A].localeCompare(a[Z_A])));
            return;
        }

        //HIGH TO LOW SORTING
        if (sortType === "HIGH_TO_LOW" && HIGH_TO_LOW && originalData.length > 0) {

            //Sorting logic based on user provided number field
            getSortedData([...originalData].sort((a, b) => parseInt(b[HIGH_TO_LOW]) - parseInt(a[HIGH_TO_LOW])));
            return;
        }

        //LOW TO HIGH SORTING
        if (sortType === "LOW_TO_HIGH" && LOW_TO_HIGH && originalData.length > 0) {

            //Sorting logic based on user provided number field
            getSortedData([...originalData].sort((a, b) => parseInt(a[LOW_TO_HIGH]) - parseInt(b[LOW_TO_HIGH])));
            return;
        }

        
        //HIGH TO LOW SORTING
        if (sortType === "High_TO_Low" && High_TO_Low && originalData.length > 0) {

            //Sorting logic based on user provided number field
            getSortedData([...originalData].sort((a, b) => parseInt(b[High_TO_Low]) - parseInt(a[High_TO_Low])));
            return;
        }

        //LOW TO HIGH SORTING
        if (sortType === "Low_TO_High" && Low_TO_High && originalData.length > 0) {

            //Sorting logic based on user provided number field
            getSortedData([...originalData].sort((a, b) => parseInt(a[Low_TO_High]) - parseInt(b[Low_TO_High])));
            return;
        }

        //NEWEST SORTING
        if (sortType === "NEWEST" && NEWEST && originalData.length > 0) {

            //Sorting logic based on user provided date field
            getSortedData([...originalData].sort((a, b) => new Date(b[NEWEST]).getTime() - new Date(a[NEWEST]).getTime()));
            return;
        }

        //OLDEST SORTING
        if (sortType === "OLDEST" && OLDEST && originalData.length > 0) {

            //Sorting logic based on user provided date field
            getSortedData([...originalData].sort((a, b) => new Date(a[OLDEST]).getTime() - new Date(b[OLDEST]).getTime()));
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
        // <select
        //     name="super_sort"
        //     value={sortType}
        //     onChange={(e) => setSortType(e.target.value)}
        // >

        //     <option value="DEFAULT">Select Option</option>
        //     {A_Z && <option value="A_Z">A-Z</option>}
        //     {Z_A && <option value="Z_A">Z-A</option>}
        //     {HIGH_TO_LOW && <option value="HIGH_TO_LOW">High To Low</option>}
        //     {LOW_TO_HIGH && <option value="LOW_TO_HIGH">Low To High</option>}
        //     {NEWEST && <option value="NEWEST">Newest</option>}
        //     {OLDEST && <option value="OLDEST">Oldest</option>}
        // </select>
        <div className="input-group-append apart">
        <Dropdown onSelect={(e)=>setSortType(e)}>
        <Dropdown.Toggle >
            {sortType === "Sort By" ? "Sort By" : sortType }
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {A_Z && <Dropdown.Item eventKey="A_Z">A to Z</Dropdown.Item> }
            {Z_A && <Dropdown.Item eventKey="Z_A">Z to A</Dropdown.Item>}
            {NEWEST && <Dropdown.Item eventKey="NEWEST">Newest</Dropdown.Item>}
            {OLDEST && <Dropdown.Item eventKey="OLDEST">Oldest</Dropdown.Item>}
            {HIGH_TO_LOW && <Dropdown.Item eventKey="HIGH_TO_LOW">CyCoin : High to Low</Dropdown.Item>}
            {LOW_TO_HIGH && <Dropdown.Item eventKey="LOW_TO_HIGH">CyCoin : Low to High</Dropdown.Item>}
            {High_TO_Low && <Dropdown.Item eventKey="High_TO_Low">Amt : High to Low</Dropdown.Item>}
            {Low_TO_High && <Dropdown.Item eventKey="Low_TO_High">Amt : Low to High</Dropdown.Item>}
        </Dropdown.Menu>
        </Dropdown>
        </div>
    )
}
