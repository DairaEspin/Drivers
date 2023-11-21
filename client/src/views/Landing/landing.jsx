import React from "react";
import { Link } from "react-router-dom";
import { Bg, LandingButton } from "./styles";

function LandingPage() {
  return (
    <Bg>
      <Link to="/home">
        <LandingButton>Home</LandingButton>
      </Link>
    </Bg>
  );
}

export default LandingPage;