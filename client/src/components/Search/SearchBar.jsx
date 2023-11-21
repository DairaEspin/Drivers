import React, { useState } from "react";
import { SearchButton, SearchInput } from "../ButtonsAndFilters/styledButtons";

export default function SearchBar(props) {
  const [driverSearch, setDriverSearch] = useState([]);
  const handleInputChange = (event) => {
    setDriverSearch(event.target.value);
  };

  return (
    <>
      <SearchInput type="text" onChange={handleInputChange} />
      <SearchButton onClick={() => props.onSearch(driverSearch)}>
        Buscar
      </SearchButton>
    </>
  );
}