import { types } from "../actions/employeesActions";

const initialState = {
  employees: [],
}

export const reducerEmployees = (state = initialState, action) => {
  console.log(`action`, action)
  switch (action.type) {
    case types.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
      case types.ADD_EMPLOYEE: {
      console.log(`state`, state)
      return {
        ...state,
        employees: [...state.employees, action.payload],
      }};
    case types.EDIT_EMPLOYEE:
      return {
        ...state,
        Department: action.department,
        Description: action.description,
      };
    case types.DELETE_EMPLOYEE:
      return {
        ...state,
        Department: action.department,    //
        Description: action.description,  //
      };    
    default:
      return state;
  }
};
