const axios = require("axios");
const { Drivers, Teams } = require("../db");
const {
  handlerGetDriverByName,
  handlerGetDriverByNameDB,
} = require("../handlers/driverGetters");
const urlID = "http://localhost:5000/drivers?name.forename={name}";
const validarNombre = (name) => {
  if (typeof name === "string") {
    return name.toLowerCase();
  }
  return name;
};
const handlerGetDriverByIdDB = async (id) => {
  try {
    console.log(id);
    const driverDB = await Drivers.findOne({
      where: { id: id },
      include: {
        model: Teams,
        attributes: ["name"],
      },
    });
    return {
      id: driverDB.id,
      name: driverDB.name,
      image: driverDB.image,
      teams: driverDB.Teams.map((e) => renombrar(e.name)),
      description: driverDB.description,
      nacionality: driverDB.nacionality,
      birthday: driverDB.birthday,
    };
  } catch (error) {
    console.log(error);
  }
};
const getDriverByName = async (req, res) => {
  try {
    const { name } = validarNombre(req.query);
    console.log(name);
    const driver = await handlerGetDriverByName(urlID, name);

    if (!driver) {
      const driverDB = await handlerGetDriverByIdDB(name);

      if (!driverDB) {
        res.status(404).json({
          message: "No se a encontrado un Driver con ese Nombre o ID",
        });
      }

      return res.json(driverDB);
    }

    return res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getDriverByName };