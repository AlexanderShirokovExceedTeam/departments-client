import { types } from "../types/departmentActionTypes";

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
        departments: [...action.payload],
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
