import { types } from "../actions/departmentsActions";

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

export const editDepartment = (editedDepartments) => {
  return {
    type: types.EDIT_DEPARTMENT,
    payload: editedDepartments,
  };
};

export const deleteDepartment = (deletedDepartmentId) => {
  return {
    type: types.DELETE_DEPARTMENT,
    payload: deletedDepartmentId,
  };
};
