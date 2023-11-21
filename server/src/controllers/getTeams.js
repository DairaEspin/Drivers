const axios = require("axios");
const { Team } = require("../db");
const URL_TEAMS = "http://localhost:5000/drivers";

const getTeams = async (req, res) => {
  try {
    let searchTeam = await Team.findAll();
    if (searchTeam.length > 0){
      return res.status(200).json({ searchTeam });
    }else {
      const response = await axios.get(`http://localhost:5000/drivers`);
      const data = response.data;
      console.log(data)
      return res.status(200).json(response.data.results)
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};


// const getTeams = async (req, res) => {
//   try {
//     const dbTeams = await Teams.findAll();
//     if (dbTeams.length === 0) {
//       const apiData = await axios.get(`${URL_TEAMS}`);
//       const teamsFromAPI = apiData.data.results || [];;

//       for (const type of teamsFromAPI) {
//         await Teams.create({ name: type.name });
//       }
//       const addedDBTeams = await Teams.findAll();
//       const teamsNameProps = addedDBTeams.map((t) => t.name);

//       res.status(200).json(teamsNameProps);
//     } else {
//       res.status(200).json(dbTeams);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = getTeams;