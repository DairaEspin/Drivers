import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AddButton,
  AddTeam,
  Button,
  ButtonContainer,
  DeleteTeam,
  FormContainer,
  FormWrapper,
  TeamDiv,
  WarningSpan,
} from "./styledForm";
import axios from "axios";
import { validateForm } from "./validaciones";
const AddDriver = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    nacionality: "",
    birthday: 0,
    teams: [],
  });

  const [errors, setErrors] = useState("");
  const handleCreateButtonClick = () => {
    if (
      !formData.name ||
      !formData.image ||
      !formData.description ||
      !formData.nacionality ||
      !formData.birthday ||
      !formData.teams.length
    ) {
      window.alert("Por favor, completa todos los campos");
    }
  };

  const [registro, setRegistro] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors(validateForm({ ...formData, [name]: value }));
  };

  const handleAddTeam = () => {
    // Agrega un nuevo tipo vacío al formulario
    if (formData.teams.length < 2) {
      setFormData({ ...formData, teams: [...formData.teams, ""] });
    }
  };
  const handleTeamChange = (index, value) => {
    // Actualiza el valor de un tipo en el formulario
    const updatedTeams = [...formData.teams];
    updatedTeams[index] = value;
    setFormData({ ...formData, teams: updatedTeams });
  };
  const handleRemoveTeam = (index) => {
    // Elimina un tipo del formulario
    const updatedTeams = [...formData.teams];
    updatedTeams.splice(index, 1);
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!handleCreateButtonClick()) {
        const { data } = await axios.post(
          "http://localhost:3001/driverss/db",
          formData
        );
        if (data.message === "Registro exitoso") {
          setRegistro(!registro);
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
    //?Limpiar formulario 👇🏻
    setFormData({
      name: "",
      image: "",
      description: "",
      nacionality: "",
      birthday: 0,
      teams: [],
    });
  };
  return (
    <FormContainer>
      <FormWrapper>
        <h2>¡Crea el tuyo!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name ? <WarningSpan>{errors.name}</WarningSpan> : null}
          </div>
          <div>
            <label>Imagen</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="URL de imagen"
            />
            {errors.image ? <WarningSpan>{errors.image}</WarningSpan> : null}
          </div>
          <div>
            <label>Nacionality</label>
            <input
              type="text"
              name="nacionality"
              value={formData.nacionality}
              onChange={handleInputChange}
            />
            {errors.attack ? <WarningSpan>{errors.attack}</WarningSpan> : null}
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.defense ? (
              <WarningSpan>{errors.defense}</WarningSpan>
            ) : null}
          </div>
          <div>
            <label>Bithday </label>
            <input
              type="number"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </div>
          <TeamDiv>
            {" "}
            <label>Teams (max. 2):</label>
            {formData.teams.map((team, index) => (
              <TeamDiv key={index}>
                <AddTeam
                  team="text"
                  value={team}
                  onChange={(e) => handleTeamChange(index, e.target.value)}
                />
                <DeleteTeam
                  type="button"
                  onClick={() => handleRemoveTeam(index)}
                >
                  -
                </DeleteTeam>
              </TeamDiv>
            ))}
            <AddButton type="button" onClick={handleAddTeam}>
              +
            </AddButton>
          </TeamDiv>

          <ButtonContainer>
            <Button type="submit">Confirm</Button>
          </ButtonContainer>
        </form>
      </FormWrapper>
    </FormContainer>
  );
};

export default AddDriver;