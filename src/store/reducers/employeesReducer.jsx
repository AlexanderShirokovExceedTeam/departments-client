import { types } from "../types/employeeActionTypes";

const initialState = {
  employees: [],
};

export const reducerEmployees = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case types.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case types.EDIT_EMPLOYEE:
      return {
        ...state,
        employees: [...action.payload],
      };
    case types.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
