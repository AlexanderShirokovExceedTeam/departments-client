import { types } from "../types/employeeActionTypes";

const initialState = {
  employees: [],
};

export const reducerEmployees = (state = initialState, action: any) => {
  switch (action.type) {
    case (types.GET_EMPLOYEES_START,
    types.ADD_EMPLOYEE_START,
    types.EDIT_EMPLOYEE_START,
    types.DELETE_EMPLOYEE_START):
      return {
        ...state,
        loading: true,
      };
    case (types.GET_EMPLOYEES_ERROR,
    types.ADD_EMPLOYEE_ERROR,
    types.EDIT_EMPLOYEE_ERROR,
    types.DELETE_EMPLOYEE_ERROR):
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
      };
    case types.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case types.EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...action.payload],
      };
    case types.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter(
          (employee: any) => employee._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
