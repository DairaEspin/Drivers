import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Div2, ItemLi, Lista, Logo, LogoCenter, NavStyle } from "./styledNav";
import landing from "../../assets/landing.jpg";

function Nav(props) {
  const { isRendered } = props;
  const location = useLocation();

  return (
    <NavStyle className={isRendered ? "" : "inactive"}>
      {location.pathname === "/" ? (
        <LogoCenter src={landing} />
      ) : (
        <>
          {location.pathname !== "/home" && <Logo src={landing} />}
          <Div2>
            <Lista>
              <Link to="/home">
                <ItemLi>Home</ItemLi>
              </Link>

              <Link to="/about">
                <ItemLi>acerca de</ItemLi>
              </Link>
              <Link to="/create">
                <ItemLi>crear</ItemLi>
              </Link>
            </Lista>
          </Div2>
        </>
      )}
    </NavStyle>
  );
}

export default Nav;