import {
  GET_ALL,
  CREATE_DRIVER,
  FILTERTEAM,
  GET_LIST,
  SET_DRIVER_TEAMS,
  SET_PAGINATION,
  SORT_DRIVER_LIST,
  GET_DB,
  SET_ORIGIN,
} from "./actionTypes";

const initialState = {
  allDrivers: [],
  backUp: [],
  myDrivers: [],
  types: [],
  currentPage: 1,
  itemsPerPage: 12,
  searchResults: [],
  filteredDriver: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DRIVER:
      return {
        ...state,
        myDrivers: action.payload,
      };

    case FILTERTEAM:
      const filtered = [...state.filteredDriver].filter((p) => {
        return Array.isArray(p.types) && p.types.includes(action.payload);
      });
      return {
        ...state,
        filteredDriver: filtered,
      };
    case GET_ALL:
      return {
        ...state,
        allDriver: action.payload,
        filteredDriver: action.payload,
      };
    case GET_DB:
      return {
        ...state,
        myDrivers: action.payload,
      };
 
    case SET_ORIGIN:
      let breedsFromApiOrDbOrAll = [];
      // Si la acción es 'all', selecciona todas los driver
      if (action.payload === "all") {
        breedsFromApiOrDbOrAll = state.allDrivers;
        // Si la acción es 'db', selecciona solo los drivers con ID de tipo 'string'
      } else if (action.payload === "db") {
        breedsFromApiOrDbOrAll = state.allDrivers.filter(
          (e) => e.id.length > 10
        );
        // Si la acción es 'api', selecciona solo los drivers con ID de tipo 'number'
      } else if (action.payload === "api") {
        breedsFromApiOrDbOrAll = state.allDrivers.filter(
          (e) => typeof e.id === "number"
        );
      }
      return {
        ...state,
        filteredDriver: breedsFromApiOrDbOrAll,
      };
 
    case SET_PAGINATION:
      return {
        ...state,
        currentPage: action.payload.page,
        itemsPerPage: action.payload.itemsPerPage,
      };
    case SET_DRIVER_TEAMS:
      return {
        ...state,
        types: action.payload,
      };
    case SORT_DRIVER_LIST:
      const sortedDriver = [...state.filteredDriver].sort((a, b) => {
        if (action.payload === "asc") {
          // Verificamos si a y b tienen la propiedad 'name' antes de compararlas
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
        } else if (action.payload === "desc") {
          // Verificamos si a y b tienen la propiedad 'name' antes de compararlas
          if (a.name && b.name) {
            return b.name.localeCompare(a.name);
          }
        }
        // Si la acción no es ni 'upward' ni 'falling', no cambiamos el orden.
        return 0;
      });
      return { ...state, filteredDriver: sortedDriver };
    default:
      return state;
  }
}

export default rootReducer;