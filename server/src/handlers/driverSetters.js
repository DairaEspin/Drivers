const axios = require("axios");
const { Drivers, Teams } = require("../db");

const handlerCreateDriver = async (
  name,
  lastname,
  image,
  nacionality,
  birthday,
  teams
) => {
  try {
    const { name, lastname, image, nacionality, birthday, teams } = req.body;
    const newDriver = await Drivers.create({
      name,
      lastname,
      image,
      nacionality,
      birthday,
      teams,
    });

    //*Instancio el modelo Type para agregar los tipos de pokemon
    const instancia = await Teams.bulkCreate(
      teams.map((teamName) => ({ name: teamName })),
      { ignoreDuplicates: true }
    );

    //*Relación en la tabla
    await newDriver.addTeams(instancia);
    res.status(200).json(newDriver);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Handle Sequelize validation errors
      res
        .status(400)
        .json({ error: "Error de validación", details: error.errors });
    } else {
      // Handle other errors
      res
        .status(500)
        .json({ error: "Error interno del servidor", details: error.message });
    }
  }
};

module.exports =  handlerCreateDriver;