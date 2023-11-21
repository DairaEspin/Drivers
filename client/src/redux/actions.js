import axios from "axios";
import {
  CREATE_DRIVER,
  FILTERTEAM,
  GET_ALL,
  SET_PAGINATION,
  SET_DRIVER_TEAMS,
  GET_DB,
  SORT_DRIVER_LIST,
  SET_ORIGIN,
} from "./actionTypes";

export const getDBDrivers = () => {
  const endpoint = "http://localhost:5001/drivers/db";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_DB,
        payload: data,
      });
    } catch (error) {
      return window.alert("Error", error);
    }
  };
};

export const filterOrigin = (origin) => {
  return (dispatch) => {
    dispatch({
      type: SET_ORIGIN,
      payload: origin,
    });
  };
};

export const getBackUpDrivers = () => {
  const endpoint = "http://localhost:5001/drivers/all";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_ALL,
        payload: data,
      });
    } catch (error) {
      return window.alert("Error", error);
    }
  };
};
export const fetchDriver = (id) => {
  const baseURL = " http://localhost:5000/drivers";
  return axios(`${baseURL}drivers/${id}`).then((response) => {
    const data = response.data;
    const {
      id,
      name,
      sprites: {
        other: {
          home: { front_default },
        },
      },
      types,
      stats,
      nacionality,
      birthday,
    } = data;

    const driverData = {
      id,
      name,
      sprites: front_default,
      types: types.map((e) => e.type.name),
      description,
      nacionality,
      birthday,
    };

    return driverData;
  });
};
export const fetchDBDriver = (id) => {
  const baseURL = "http://localhost:5001/drivers/db";
  return axios(`${baseURL}/${id}`).then((response) => {
    const data = response.data;
    const { id, name, image, teams, nacionality, birthday, description } = data;

    const driverData = {
      id,
      name,
      image,
      types: teams.map((e) => e.type.name),
      nacionality,
      birthday,
      description,
    };

    return driverData;
  });
};

export const filterTeam = (filter) => {
  return {
    type: FILTERTEAM,
    payload: filter,
  };
};

export const fetchDriverTeam = () => async (dispatch) => {
  try {
    const response = await axios.get(" http://localhost:5000/drivers");
    const data = response.data;

    // Extraer los nombres de los tipos de los datos de la API
    const teamNames = data.results.map((type) => type.name);

    dispatch({
      type: SET_DRIVER_TEAMS,
      payload: teamNames,
    });
  } catch (error) {
    console.error(error);
  }
};
export const addDriver = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/drivers",
        formData
      );
      dispatch({
        type: CREATE_DRIVER,
        payload: response.data,
      });
    } catch (error) {
      console.log("No se ha podido agregar el Driver.  ", error);
    }
  };
};

export const setPagination = (page, itemsPerPage) => {
  return {
    type: SET_PAGINATION,
    payload: {
      page,
      itemsPerPage,
    },
  };
};

export const sortDriverList = (order) => {
  return {
    type: SORT_DRIVER_LIST,
    payload: order,
  };
};