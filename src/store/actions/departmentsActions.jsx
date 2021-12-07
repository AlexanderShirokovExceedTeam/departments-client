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
        // console.log(`res.data.data =>>>`, res.data.data);
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

export const createDepartmentAsync = (newDepartment) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/department/add", newDepartment)
      .then((res) => {
        if (res) {
          // setDepartments([...departments, res.data.data]);
          dispatch(createDepartment(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        // setSnackmessage(
        //   "Add department error. Name is required and must be unique."
        // );
        // setSnackbarOpen(true);
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

          // setDepartments(editedDepartments);
          dispatch(editDepartment(editedDepartments));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        // setSnackmessage(
        //   "Edit department error. Name is required and must be unique."
        // );
        // setSnackbarOpen(true);
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
        // departments.splice(entityIndex, 1);

        // setDepartments([...departments]);
        dispatch(deleteDepartment(departmentId));
      })
      .catch((err) => {
        console.log(`err`, err);
        // setSnackmessage("Can not delete department with employee");
        // setSnackbarOpen(true);
      });
  };
};
