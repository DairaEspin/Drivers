import React from "react";
import { Background, Container, Title, TitleImage } from "./styled";

import TypeFilter from "../ButtonsAndFilters/Filters/typeFilter";
export const Homepage = () => {
  return (
    <>
      <Title>Busca, Ordena y Filtra Drivers</Title>
      <Background />
      <Container>
        <TypeFilter />
      </Container>
    </>
  );
};