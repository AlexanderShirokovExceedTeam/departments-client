import axios from "axios";
import { types } from "../types/departmentActionTypes";

export const getDepartmentsStart = () => {
  return {
    type: types.GET_DEPARTMENTS_START,
  };
};

export const getDepartments = (departments) => {
  return {
    type: types.GET_DEPARTMENTS,
    payload: departments,
  };
};

export const getDepartmentsError = (error) => {
  return {
    type: types.GET_DEPARTMENTS_ERROR,
    payload: error,
  };
};

export const getDepartmentsAsync = () => {
  return (dispatch) => {
    dispatch(getDepartmentsStart());
    axios
      .get("http://localhost:8000/departments")
      .then((res) => {
        dispatch(getDepartments(res.data.data));
      })
      .catch((err) => {
        dispatch(getDepartmentsError(err));
      });
  };
};

export const createDepartment = (newDepartment) => {
  return {
    type: types.ADD_DEPARTMENT,
    payload: newDepartment,
  };
};

export const createDepartmentAsync = (newDepartment) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/department/add", newDepartment)
      .then((res) => {
        if (res) {
          dispatch(createDepartment(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};

export const editDepartment = (department) => {
  return {
    type: types.EDIT_DEPARTMENT,
    payload: department,
  };
};

export const editDepartmentAsync = (department, departments) => {
  console.log(`department`, department);
  return (dispatch) => {
    axios
      .patch(
        `http://localhost:8000/department/edit/${department._id}`,
        department
      )
      .then((res) => {
        if (res) {
          console.log(`res.data ===>>>`, res.data);
          const editedDepartments = departments.map((item) => {
            if (item._id === res.data._id) {
              return res.data;
            }

            return item;
          });

          dispatch(editDepartment(editedDepartments));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};

export const deleteDepartment = (departmentId) => {
  return {
    type: types.DELETE_DEPARTMENT,
    payload: departmentId,
  };
};

export const deleteDepartmentAsync = (departmentId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/department/delete/${departmentId}`)
      .then(() => {
        dispatch(deleteDepartment(departmentId));
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};
