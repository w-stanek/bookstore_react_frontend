import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Search(props) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value)
        console.log(value)
    }

    const handleClick = () => {
        setValue("")
        axios.post(props.url + "/book/findresult?keyword=" + value)
            .then((response) => {
                console.log(response)
                props.setBooks(response.data)
                props.setFindTrigger(true)
            }).catch((error) =>{console.log("nenalezeno")})
    }
    return (
    
            <InputGroup size='sm'>
                <FormControl placeholder='enter keyword' value={value} onChange={(e) => { handleChange(e) }}></FormControl>
                <Button variant="primary" size='sm' onClick={handleClick}>Search</Button>
            </InputGroup>

    )
}

export default Search