import React from 'react'
import './style/searchbar.css'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function SearchBar(props) {
    return (
        <InputGroup className="searchbar" size="sm">
            <FormControl placeholder="Search" />
        </InputGroup>
    );
}

export default SearchBar;