import { types } from "../actions/employeesActions";

export const getEmployees = (employees) => {
  return {
    type: types.GET_EMPLOYEES,
    payload: employees,
  };
};

export const createEmployee = (newEmployee) => {
  return {
    type: types.ADD_EMPLOYEE,
    payload: newEmployee,
  };
};

export const editEmployee = (employees) => {
  return {
    type: types.EDIT_EMPLOYEE,
    payload: employees,
  };
};

export const deleteEmployee = (employees) => {
  return {
    type: types.DELETE_EMPLOYEE,
    payload: employees,
  };
};
