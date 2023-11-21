const axios = require("axios");
const { handlerGetDriverAPI }= require("../handlers/driverGetters");
const { Team, Driver } = require("../db");

const url = "http://localhost:5000/drivers";
let page = url;

const getDrivers = async (req, res) => {
  try {
    // Hacer una solicitud GET 
   const response = await axios.get(`http://localhost:5000/drivers`);
    if (!response.data) throw Error("Driver Not Found");
  // Los datos de los Pokémon se encuentran en response.data.results
    const driver = response.data.results;
    return res.status(200).json(driver);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// const getDrivers = async (req, res) => {
//   try {
//     console.log('Before axios');
//     const { data } = await axios(url);
//     console.log('After axios');
//     const driversList = data && data.results ? data.results : [];
    
//     const driverArrayOfPromises = handlerGetDriverAPI(driversList);
//     const listaDriver = await Promise.all(driverArrayOfPromises);
//     console.log(listaDriver);
//     return res.status(200).json(listaDriver);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


//*PAGINACION
const getNext = async (req, res) => {
  try {
    const { data } = await axios.get(page);
    if (data.next !== null) {
      page = data.next;
    } else {
      page = process.env.URL;
    }
    try {
      const { data } = await axios.get(page);
      const driverNext = await data.results;
      const driver = handlerGetDriverAPI(driverNext);
      const getAll = await Promise.all(driver);

      return res.status(200).json(getAll);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getPrevious = async (req, res) => {
  try {
    const { data } = await axios(page);
    if (data.previous !== null) {
      page = data.previous;
    } else {
      page = page;
    }
    try {
      const { data } = await axios(page);
      const driverPrevious = await data.results;
      const driver = handlerGetDriverAPI(driverPrevious);
      const getAll = await Promise.all(driver);

      return res.status(200).json(getAll);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getDrivers,
  getNext,
  getPrevious
};

