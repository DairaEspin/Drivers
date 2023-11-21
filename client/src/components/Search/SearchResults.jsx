import React from "react";
import DriverCard from "../Cards/Card";
import { Link } from "react-router-dom";

export default function SearchResults({ searchResults }) {
  return (
    <>
      {" "}
      {searchResults.map((driver) => (
        <Link to={`/detail/${driver.id}`}>
          <PokemonCard key={driver.id} driver={driver} />{" "}
        </Link>
      ))}
    </>
  );
}