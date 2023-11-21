const routerDriver = require("express").Router();
const createDriver = require("../DB/createDriver");
const { getAll } = require("../controllers/getBackUpDriver");
const  { getDrivers , getNext,  getPrevious }= require("../controllers/getDriver");
const { getDriverById } = require("../controllers/getDriverById");
const { getDriverByName }  = require("../controllers/searchByName");
const getDB = require("../DB/getDB");


routerDriver.get('/', getDrivers)
routerDriver.get('/all', getAll)
routerDriver.get('/name', getDriverByName);
routerDriver.get('/next', getNext)
routerDriver.get('/previous', getPrevious)
routerDriver.get("/:id", getDriverById);
routerDriver.post("/create", createDriver);
routerDriver.get('/db', getDB)


module.exports = routerDriver;