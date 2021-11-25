import { types } from "../types/departmentActionTypes";

export const getDepartments = (departments) => {
  return {
    type: types.GET_DEPARTMENTS,
    payload: departments,
  };
};

export const createDepartment = (newDepartment) => {
  return {
    type: types.ADD_DEPARTMENT,
    payload: newDepartment,
  };
};

export const editDepartment = (department) => {
  return {
    type: types.EDIT_DEPARTMENT,
    payload: department,
  };
};

export const deleteDepartment = (departmentId) => {
  return {
    type: types.DELETE_DEPARTMENT,
    payload: departmentId,
  };
};