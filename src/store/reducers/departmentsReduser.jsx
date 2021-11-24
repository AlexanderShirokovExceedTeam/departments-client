import { types } from "../actions/departmentsActions";

const initialState = {
  departments: [],
};

export const reducerDepartments = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case types.ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
      };
    case types.EDIT_DEPARTMENT:
      return {
        ...state,
        name: action.department,
        departments: [...action.payload],
        // departments: state.departments.map((item) => {
        //   return item._id === action.payload._id ? action.payload : item;
        // }),
      };
    case types.DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
