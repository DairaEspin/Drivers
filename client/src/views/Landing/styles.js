import styled from "styled-components";
import background from "../../assets/landing.jpg";
export const Bg = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: calc(100vh - 50px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Utiliza un import para la imagen de fondo */
  background-image: url(${background});
  margin: 0;
  top: 50px;
  left: 0;
  padding: auto;
`;

export const LandingButton = styled.button`
  position: absolute;
  border-radius: 30px;
  top: 55%;
  left: 28em;
  background-color: #fff;
  border: none;
  color: red;
  font-size: large;
  cursor: pointer;
  width: 200px;
  margin-top: -153px;
  padding: 1em;
  transition: 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
  &:hover {
    scale: 1.1;
    background-color: #f0ef84;
  }
`;