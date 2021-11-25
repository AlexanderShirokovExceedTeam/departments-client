import { types } from "../types/employeeActionTypes";

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

export const editEmployee = (employee) => {
  return {
    type: types.EDIT_EMPLOYEE,
    payload: employee,
  };
};

export const deleteEmployee = (employeeId) => {
  return {
    type: types.DELETE_EMPLOYEE,
    payload: employeeId,
  };
};
