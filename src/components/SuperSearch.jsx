import React, { useState,useEffect } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';

export const SuperSearch = ({ dataSource, getfilteredData, isLoading ,message12}) => {

    //Search Value 
    const [searchValue, setSearchValue] = useState("");
    //Original Data
    const [originalData, setOriginalData] = useState([]);
    //Search Index to search from
    const [searchIndex, setSearchIndex] = useState([]);

useEffect(()=>{
    setSearchValue("")
},[message12])
    useEffect(() => {
        isLoading(true);
        setOriginalData(dataSource);
        getfilteredData(dataSource);
        const newSearchIndex = dataSource.map((item, index) => {
            const allValues = crawlData(item);
            return { allValues: allValues.toString() };
        })
        setSearchIndex(newSearchIndex);
        if (dataSource) {
            isLoading(false);
        }
    }, [dataSource]);

    useEffect(() => {
        if (searchValue) {
            const reqData = searchIndex.map((item, index) => {
                if (item.allValues.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                    return originalData[index]
                }
                return null;
            })
            const output = reqData.filter((item) => {
                if (item) {
                    return true;
                }
                return false;
            })
            getfilteredData(output);
        } else {
            getfilteredData(originalData);
        }
    }, [searchValue, originalData, searchIndex]);

    const crawlData = (item, allValues = []) => {
        //iterating over all the keys inside item object
        for (let key in item) {
            //if any again has an object,
            //then using recursion to get to depth
            if (typeof item[key] === "object") {
                crawlData(item[key], allValues);
            } else {
                //end condition to break recursion and putting all the values,
                //inside allValues array which makes our search Index
                allValues.push(item[key] + " ");
            }
        }

        //returning allValues
        return allValues;
    }

    return (
        // <div>
        //     <div>SuperSearch</div>
        //     <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
        // </div>
        <InputGroup className="">
        <FormControl
            type="text" className='search_data'  placeholder="Search" name="search" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue}
        />
    </InputGroup>
    )
}
