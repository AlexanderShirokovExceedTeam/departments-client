import { types } from "../types/departmentActionTypes";

const initialState = {
  departments: [],
  loading: false,
  error: null,
};

export const reducerDepartments = (state = initialState, action: any) => {
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
    case types.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.payload, //  action.payload.departments
      };
    case types.ADD_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: [...state.departments, action.payload],
      };
    case types.EDIT_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: [...action.payload],
      };
    case types.DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: state.departments.filter(
          (department: any) => department._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
