const axios = require("axios");
const { Drivers, Teams } = require("../db");
const  handlerCreateDriver = require("../handlers/driverSetters");

const validarDatosPostDriver = (driver) => {
  const { name, image, nacionality, description, birthday } = driver;

  if (
    !name ||
    !image ||
    !nacionality ||
    !description ||
    !birthday 
  )
    return "Por favor, complete todos los datos requeridos";

  console.log(name);

  if (typeof name !== "string" || name.length > 11)
    return "El nombre del Driver no es correcto";

  if (typeof image !== "string") return "Inserte una url valida";

  if (typeof nacionality !== "string") return "Nacionality no valida";

  if (birthday < 1 || birthday > 8) return "Error, ingrese numero entre 1 y 8";


  return driver;
};
const createDriver = async (req, res) => {
  try {
    const { name, image, description, nacionality, birthday, teams } = req.body;
    if (!image) {
      image =
"https://media.gq.com.mx/photos/636fd678787ece92809cbf2f/16:9/w_1600,c_limit/Max%20verstappen%201.jpg"    }
    const newDriver = await Drivers.create({
      name,
      image,
      description,
      nacionality,
      birthday,
      teams,
    });

    //*Instancio el modelo Teams para agregar los tipos de driver
    const instancia = await Teams.bulkCreate(
      types.map((typeName) => ({ name: typeName })),
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

module.exports = createDriver;