const axios = require("axios");
const { Drivers, Teams } = require("../db");
const urlId = "http://localhost:5000/drivers/${id}";
const validarNombre = (name) => {
  if (typeof name === "string") {
    return name.toLowerCase();
  }
  return name;
};

const renombrar = (name) => {
  if (Array.isArray(name)) {
    const newNameArray = name.map((type) => {
      return type.charAt(0).toUpperCase() + type.slice(1);
    });
    return newNameArray;
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
};
const handlerGetDriverById = async (url, id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    const i = data;
    return {
      id: i.id,
      name: renombrar(i.name),
      lastname: i.lastname.map((e) => renombrar(e.lastname.name)),
      image: i.sprites.other.home.front_default,
    };
  } catch (error) {
    console.log(error);
  }
};
const handlerGetDriverByIdDB = async (id) => {
  try {
    console.log(id);
    const driverDB = await Drivers.findOne({
      where: { name: id },
      include: {
        model: Teams,
        attributes: ["name"],
      },
    });
    return {
      id: driverDB.id,
      name: driverDB.name,
      image: driverDB.image,
      teams: driverDB.Types.map((e) => renombrar(e.name)),
    };
  } catch (error) {
    console.log(error);
  }
};
const getDriverById = async (req, res) => {
  try {
    const id = validarNombre(req.params.id);
    const driver = await handlerGetDriverById(urlId, id);
    if (!driver) {
      const driverDB = await handlerGetDriverByIdDB(id);

      if (!driverDB) {
        res.status(404).json({
          message: "No se a encontrado ese Driver con ese Nombre o ID",
        });
      }

      return res.json(driverDB);
    }

    return res.json(driver);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getDriverById };