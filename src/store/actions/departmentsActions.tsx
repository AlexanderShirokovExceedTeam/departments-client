import axios from "axios";
import { types } from "../types/departmentActionTypes";
import { IDepartment } from "../../types"

export const getDepartmentsStart = () => {
  return {
    type: types.GET_DEPARTMENTS_START,
  };
};

export const getDepartments = (departments: any) => {
  return {
    type: types.GET_DEPARTMENTS,
    payload: departments,
  };
};

export const getDepartmentsError = (error: any) => {
  return {
    type: types.GET_DEPARTMENTS_ERROR,
    payload: error,
  };
};

export const getDepartmentsAsync = () => {
  return (dispatch: Function) => {
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

export const createDepartment = (newDepartment: IDepartment) => {
  return {
    type: types.ADD_DEPARTMENT,
    payload: newDepartment,
  };
};

export const createDepartmentAsync = (newDepartment: IDepartment) => {
  return (dispatch: Function) => {
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

export const editDepartment = (department: IDepartment) => {
  return {
    type: types.EDIT_DEPARTMENT,
    payload: department,
  };
};

export const editDepartmentAsync = (department: IDepartment, departments: any) => {
  console.log(`department`, department);
  return (dispatch: Function) => {
    axios
      .patch(
        `http://localhost:8000/department/edit/${department._id}`,
        department
      )
      .then((res) => {
        if (res) {
          console.log(`res.data ===>>>`, res.data);
          const editedDepartments = departments.map((item: IDepartment) => {
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

export const deleteDepartment = (departmentId: string) => {
  return {
    type: types.DELETE_DEPARTMENT,
    payload: departmentId,
  };
};

export const deleteDepartmentAsync = (departmentId: any) => {
  return (dispatch: Function) => {
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
