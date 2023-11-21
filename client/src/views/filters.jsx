import React from "react";
import { Container } from "../components/Home/styles";
import TeamFilter from "../components/ButtonsAndFilters/Filters/typeFilter";

const Team = () => {
  return (
    <div>
      <Container>
        <TeamFilter />
      </Container>
    </div>
  );
};

export default Team;