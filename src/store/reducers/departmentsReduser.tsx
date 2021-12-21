import { types } from "../types/departmentActionTypes";

const initialState = {
  departments: [],
  loading: false,
  error: null,
};

export const reducerDepartments = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS_START:
      return {
        ...state,
        loading: true,
      };
    case types.GET_DEPARTMENTS:
      return {
        ...state,
        loading: false,
        error: null,
        departments: action.payload, //  action.payload.departments
      };
    case types.GET_DEPARTMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    //
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
          (department : any) => department._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
