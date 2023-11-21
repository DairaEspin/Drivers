import React from "react";
import { Container, Line, TextContainer, Title } from "./styledAbout";
const AboutMe = () => {
  return (
    <div>
      <Container>
        <TextContainer>
          <Title>Bienvenid@s! Soy Daira Espinoza.</Title>
          <div>
            <Line>
              Este es mi Proyecto Individual de Drivers.
              Utilice con React, Redux, NodeJS, Express y PostgreSQL.
            </Line>
          </div>
          <Line>Gracias por haber llegado hasta acá!</Line>
        </TextContainer>
      </Container>
    </div>
  );
};

export default AboutMe;