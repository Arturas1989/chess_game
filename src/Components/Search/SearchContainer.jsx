import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';

const SearchContainer = () => {
  const [searchVals, setSearchVals] = useState({username : '', title : ''});
  return (
      <div className="SearchContainer">
        <SearchBar searchVals={searchVals} onSearchValsChange={setSearchVals} />
        <Select searchVals={searchVals} onSearchValsChange={setSearchVals} />
      </div>
  )
}

export default SearchContainer