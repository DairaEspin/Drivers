import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Icon,
  Stats,
  TeamsTitle,
  TeamDiv,
  TeamsContainer,
  StatsTitle,
  Container,
  Name,
  ID,
  StatsContainer,
  Div1,
  Div2,
  Container2,
} from "./styledDetail";
import { fetchDriver } from "../../redux/actions";
import {
  ButtonContainer,
  NextButton,
  PageContainer,
  PreviousButton,
} from "../ButtonsAndFilters/styledButtons";

const Detail = () => {
  const { id } = useParams();
  const [driverDetail, setDriverDetail] = useState({ types: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDriver(id).then((driverData) => {
      setDriverDetail(driverData);
    });
  }, [id]);

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/detail/${nextId}`);
    fetchDriver(nextId).then((driverData) => {
      setDriverDetail(driverData);
    });
  };

  const handlePrevious = () => {
    const previousId = parseInt(id) - 1;
    navigate(`/detail/${previousId}`);
    fetchDriver(previousId).then((driverData) => {
      setDriverDetail(driverData);
    });
  };

  return (
    <Container2>
      <Container>
        <Div1>
          {driverDetail.name && <Name>{driverDetail.name}</Name>}{" "}
          <div>{driverDetail.id && <ID>Driver #{driverDetail.id}</ID>}</div>
          <StatsContainer>
            <StatsTitle>STATS</StatsTitle>
            <Stats>
              {driverDetail.description && <p>Description: {driverDetail.description}</p>}
              {driverDetail.nacionality && <p>Nacionality: {driverDetail.nacionality}</p>}
              {driverDetail.birthday && <p>Birthday: {driverDetail.birthday}</p>}
            </Stats>
          </StatsContainer>
          <TeamsTitle>Teams</TeamsTitle>
          <TeamsContainer>
            {driverDetail.teams && (
              <div>
                {driverDetail.teams.map((team, index) => (
                  <TeamDiv key={index} type={team}>
                    {team}
                  </TeamDiv>
                ))}
              </div>
            )}
          </TeamsContainer>
        </Div1>
        <Div2>
          {driverDetail.sprites && (
            <Icon srcSet={driverDetail.sprites} alt="driver sprite" />
          )}
        </Div2>
      </Container>
      <PageContainer>
        <ButtonContainer>
          <PreviousButton onClick={handlePrevious}>Anterior</PreviousButton>
          <NextButton onClick={handleNext}>Siguiente</NextButton>
        </ButtonContainer>
      </PageContainer>
    </Container2>
  );
};

export default Detail;