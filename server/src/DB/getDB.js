const { Drivers, Teams } = require("../db");
const getDB = async (req, res) => {
  try {
    // Buscar todos los Drivers con sus teams asociados
    const drivers = await Drivers.findAll({
      include: {
        model: Teams,
        through: "driver_teams", // Nombre de la tabla intermedia
        attributes: ["name"], // Puedes seleccionar las columnas que desees mostrar
      },
    });

    // Mapear los resultados en el formato deseado
    const formattedDrivers = drivers.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        image: driver.image,
        teams: driver.Teams.map((type) => type.name),
        description: driver.description,
        nacionality: driver.nacionality,
        birthday: driver.birthday,
        // Agrega otros campos según sea necesario
      };
    });
    return res.status(201).json(formattedDrivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getDB;