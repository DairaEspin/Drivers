const axios = require("axios");
const { Drivers, Teams } = require("../db");

const handlerGetDriverAPI = (drivers) => {
  const driver = drivers.map(async (p) => {
    const { data } = await axios(p.url);
    const prop = data;
    return {
      id: prop.id,
      name: prop.name,
      types: prop.types.map((t) => t.type.name),
      image: prop.sprites.other.home.front_default,
      description: prop.stats[0].base_stat,
      nacionality: prop.stats[1].base_stat,
      birthday: prop.stats[2].base_stat,
    };
  });
  return driver;
};

const handlerGetDriverDB = async () => {
  const DriverDB = await Drivers.findAll({
    // incluyendo atributos nombre de la tabla Tipos
    include: {
      model: Teams,
    },
  });

  const getAllDriverDB = DriverDB.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      types: e.Types.map((e) => renombrar(e.name)),
      description: e.description,
      nacionality: e.nacionality,
      birthday: e.birthday,
    };
  });
  return getAllDriverDB;
};

const handlerGetDriverById = async (url, id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    const i = data;
    return {
      id: i.id,
      name: renombrar(i.name),
      types: i.Types.map((e) => renombrar(e.type.name)),
      image: i.sprites.other.home.front_default,
      description: i.stats[0].base_stat,
      nacionality: i.stats[1].base_stat,
      birthday: i.stats[2].base_stat,
    };
  } catch (error) {
    console.log(error);
  }
};

const handlerGetDriverByNameDB = async (id) => {
  try {
    console.log(id);
    const driverDB = await Drivers.findOne({
      where: { id },
      include: {
        model: Teams,
        attributes: ["name"],
      },
    });
    return {
      id: driverDB.id,
      name: driverDB.name,
      image: driverDB.image,
      type: driverDB.Types.map((e) => renombrar(e.name)),
      description: driverDB.description,
      nacionality: driverDB.nacionality,
      birthday: driverDB.birthday,
    };
  } catch (error) {
    console.log(error);
  }
};

const handlerGetDriverByName = async (url, name) => {
  try {
    const { data } = await axios.get(`${url}/${name}`);
    const i = data;
    return {
      id: i.id,
      name: renombrar(i.name),
      types: i.types.map((e) => renombrar(e.type.name)),
      image: i.sprites.other.home.front_default,
      description: i.stats[0].base_stat,
      nacionality: i.stats[1].base_stat,
      birthday: i.stats[2].base_stat,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handlerGetDriverAPI,
  handlerGetDriverById,
  handlerGetDriverByNameDB,
  handlerGetDriverDB,
  handlerGetDriverByName,
};