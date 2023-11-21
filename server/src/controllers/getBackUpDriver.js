const axios = require("axios");
const  { handlerGetDriverAPI } = require("../handlers/driverGetters");
const { Driver, Team } = require("../db");
const url = " http://localhost:5000/drivers";
const getAll = async (req, res) => {
  try {
    const { data } = await axios(url, {
      timeout: 100000, // tiempo de espera en milisegundos
    });
    const allDrive = data.results;
    const driverArrayOfPromises = handlerGetDriverAPI(allDrive);
    const listAll = await Promise.all(driverArrayOfPromises);

    // Buscar todos los Pokémon con sus tipos asociados
    const getDBDrivers = await Driver.findAll({
      include: {
        model: Team,
        through: "DriverTeam", // Nombre de la tabla intermedia
        attributes: ["name"], // Puedes seleccionar las columnas que desees mostrar
      },
    });

    // Mapear los resultados en el formato deseado
    const formattedDrivers = getDBDrivers.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        image: driver.image,
        teams: driver.Teams.map((type) => type.name),
        lastname: driver.lastname,
        decription: driver.description,
        nacionality: driver.nacionality,
        // Agrega otros campos según sea necesario
      };
    });

    const allDrivers = [...listAll, ...formattedDrivers];
    return res.status(200).json(allDrivers);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {getAll};