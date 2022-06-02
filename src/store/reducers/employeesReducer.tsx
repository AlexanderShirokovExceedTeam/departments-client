import { types } from "../types/employeeActionTypes";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const reducerEmployees = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
      case types.FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    case types.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: [...state.employees, action.payload],
      };
    case types.EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: [...action.payload],
      };
    case types.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.filter(
          (employee: any) => employee._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
