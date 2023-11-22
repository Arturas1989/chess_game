import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';

const SearchContainer = () => {
  return (
      <div className="SearchContainer">
        <SearchBar />
        <Select />
      </div>
  )
}

export default SearchContainer