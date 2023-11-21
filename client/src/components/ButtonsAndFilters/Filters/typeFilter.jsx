import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterOrigin,
  filterTeam,
  getBackUpDrivers,
  sortDriverList,
} from "../../../redux/actions";
import FilteredByTeam from "./FilteredByTeam";
import {
  CloseButton,
  Container,
  DivButton,
  SearchOverlay,
} from "./styles/styledFilters";

import SearchBar from "../../Search/SearchBar";
import { Button } from "./Order/styledOrder";
import {
  DeleteButton,
  Option,
  SearchBarContainer,
  Select,
} from "../styledButtons";
import { TeamOption } from "../../Cards/styles/styledCard";
import { ResultsContainer } from "../../Home/styled";
import SearchResults from "../../Search/SearchResults";
import axios from "axios";
import { Link } from "react-router-dom";
import DriverCard from "../../Cards/Card";
import styled, { keyframes } from "styled-components";

function TeamFilter() {
  const dispatch = useDispatch();
  const filteredDriver = useSelector((state) => state.filteredDriver);
  //filtrar por TEAM👇🏻
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("todos");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (selectedTeam === "todos") {
      dispatch(getBackUpDrivers());
    } else {
      dispatch(filterTeam(selectedTeam));
    }
  }, [dispatch, selectedTeam]);

  useEffect(() => {
    fetch("http://localhost:5000/drivers")
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0){
        const teamNames = data.results.map((team) => team.name);
        setTypes(teamNames);
  }else {
    console.error("La propiedad 'results' no está definida en la respuesta.");
  }})
      .catch((error) => console.error(error));
  }, []);

  const handleTeamChange = (event) => {
    const newTeam = event.target.value;
    setSelectedTeam(newTeam);
  };

  const handleSortChange = (event) => {
    const newOrder = event.target.value;
    setOrder(newOrder);
    dispatch(sortDriverList(newOrder));
  };

  const handleFilterOrigin = (event) => {
    event.preventDefault();
    dispatch(filterOrigin(event.target.value));
  };

  const [driverSearch, setDriverSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Agrega un estado para manejar la carga
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);

    setIsLoading(true); // Establece isLoading en true al iniciar la búsqueda
    const endpoint = `http://localhost:3001/drivers/${searchTerm}`;

    try {
      const { data } = await axios(endpoint);
      setDriverSearch((oldDriver) => [...oldDriver, data]);
    } catch (error) {
      console.log(error);
      return window.alert("Error", error);
    } finally {
      setIsLoading(false); // Establece isLoading en false al finalizar la búsqueda
    }
  };

  const handleCloseButton = () => {
    setSearchTerm("");
    setDriverSearch([]);
  };
  const handleDeleteResult = (id) => {
    setDriverSearch((prevResults) => prevResults.filter((p) => p.id !== id));
  };
  return (
    <>
      <DivButton>
        <Select
          onChange={(event) => {
            handleFilterOrigin(event);
          }}
        >
          <Option value="all">Todos los Drivers</Option>
          <Option value="db">Mis Drivers</Option>
          <Option value="api">Lista oficial</Option>
        </Select>

        <Select value={selectedTeam} onChange={handleTeamChange}>
          <Option value="todos">Selecciona un team</Option>
          {teams.map((team) => (
            <TeamOption key={team} value={team}>
              {team}
            </TeamOption>
          ))}
        </Select>
        <Button value="asc" onClick={handleSortChange}>
          Ascendente
        </Button>
        <Button value="desc" onClick={handleSortChange}>
          Descendente
        </Button>
      </DivButton>
      <Button onClick={() => setSearchTerm("buscar")}>Buscar</Button>
      <Container>
        {searchTerm && (
          <SearchOverlay>
            <CloseButton onClick={handleCloseButton}>x</CloseButton>
            <SearchBarContainer>
              <SearchBar onSearch={handleSearch} />
            </SearchBarContainer>
            {isLoading ? (
              <Loader />
            ) : (
              <ResultsContainer>
                {driverSearch.map((driver) => (
                  <div key={driver.id}>
                    <div>
                      <DeleteButton
                        onClick={() => handleDeleteResult(driver.id)}
                      >
                        X
                      </DeleteButton>
                    </div>
                    <Link to={`/detail/${driver.id}`}>
                      <DriverCard driver={driver} />
                    </Link>
                  </div>
                ))}
              </ResultsContainer>
            )}
          </SearchOverlay>
        )}

        <FilteredByTeam filteredDriver={filteredDriver} />
      </Container>
    </>
  );
}

export default TeamFilter;