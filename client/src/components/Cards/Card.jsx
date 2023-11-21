import React from "react";
import {
  CardContainer,
  ImageContainer,
  Name,
  TeamContainer,
  Image,
  TeamBadge,
  StatsContainer,
  Stat,
  StatValue,
  StatLabel,
} from "./styles/styledCard";

export default function DriverCard({ driver }) {
  return (
    <CardContainer>
      <Name>{driver.name}</Name>
      {/* <DriverID>#{driver.id}</DriverID> */}
      <ImageContainer>
        <Image src={driver.image} alt={driver.name} />
      </ImageContainer>{" "}
      <TeamContainer>
        {driver.teams.map((team) => (
          <TeamBadge key={team} type={team}>
            {team}
          </TeamBadge>
        ))}
      </TeamContainer>
      <StatsContainer>
        <Stat>
          <StatLabel>Description: </StatLabel>
          <StatValue> {driver.description}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Nacionality: </StatLabel>
          <StatValue> {driver.nacionality}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Birthday: </StatLabel>
          <StatValue> {driver.birthday}</StatValue>
        </Stat>
      </StatsContainer>
    </CardContainer>
  );
}