const{ Router } = require("express");
const router = Router();
const getTeams = require("../controllers/getTeams")
const routerDriver = require ("./routeDriver");


router.use("/drivers", routerDriver);
router.use("/teams", getTeams);

module.exports = router;
