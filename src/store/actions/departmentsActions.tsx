import axios from "axios";
import { types } from "../types/departmentActionTypes";
import { IDepartment } from "../../types"

export const fetchDataStart = () => {
  return {
    type: types.FETCH_DATA_START,
  }
}

export const fetchDataError = (error: any) => {
  return {
    type: types.FETCH_DATA_ERROR,
    payload: error,
  }
}

export const getDepartmentsSuccess = (departments: any) => {
  return {
    type: types.GET_DEPARTMENTS_SUCCESS,
    payload: departments,
  };
};

export const getDepartments = () => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .get("http://localhost:8000/departments")
      .then((res) => {
        dispatch(getDepartmentsSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(fetchDataError(err));
      });
  };
};

export const createDepartmentSuccess = (newDepartment: IDepartment) => {
  return {
    type: types.ADD_DEPARTMENT_SUCCESS,
    payload: newDepartment,
  };
};

export const createDepartment = (newDepartment: IDepartment) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .post("http://localhost:8000/department/add", newDepartment)
      .then((res) => {
        if (res) {
          dispatch(createDepartmentSuccess(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};

export const editDepartmentSuccess = (department: IDepartment) => {
  return {
    type: types.EDIT_DEPARTMENT_SUCCESS,
    payload: department,
  };
};

export const editDepartment = (department: IDepartment, departments: any) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
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

          dispatch(editDepartmentSuccess(editedDepartments));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};

export const deleteDepartmentSuccess = (departmentId: string) => {
  return {
    type: types.DELETE_DEPARTMENT_SUCCESS,
    payload: departmentId,
  };
};

export const deleteDepartment = (departmentId: any) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .delete(`http://localhost:8000/department/delete/${departmentId}`)
      .then(() => {
        dispatch(deleteDepartmentSuccess(departmentId));
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};
