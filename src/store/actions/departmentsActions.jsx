import axios from "axios";
import { types } from "../types/departmentActionTypes";

export const getDepartments = (departments) => {
  return {
    type: types.GET_DEPARTMENTS,
    payload: departments,
  };
};

export const getDepartmentsAsync = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/departments")
      .then((res) => {
        console.log(`res.data.data =>>>`, res.data.data);
        dispatch(getDepartments(res.data.data));
      })
      .catch((err) => {
        console.log(`err`, err);
        // setSnackmessage("Can not load departments");
        // setSnackbarOpen(true);
      });
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
