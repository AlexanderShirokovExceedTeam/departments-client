import axios from "axios";
import { types } from "../types/employeeActionTypes";

export const getEmployees = (employees) => {
  return {
    type: types.GET_EMPLOYEES,
    payload: employees,
  };
};

export const getEmployeesAsync = (currentDepartment) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8000/employees/${currentDepartment}`)
      .then((res) => {
        if (res) {
          dispatch(getEmployees(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};

export const createEmployee = (newEmployee) => {
  return {
    type: types.ADD_EMPLOYEE,
    payload: newEmployee,
  };
};

export const createEmployeeAsync = (newEmployee) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/employee/add", newEmployee)
      .then((res) => {
        if (res) {
          dispatch(createEmployee(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};

export const editEmployee = (employee) => {
  return {
    type: types.EDIT_EMPLOYEE,
    payload: employee,
  };
};

export const editEmployeeAsync = (employee, employees) => {
  return (dispatch) => {
    axios
      .patch(`http://localhost:8000/employee/edit/${employee._id}`, employee)
      .then((res) => {
        if (res) {
          const tempSortedEmployee = employees.map((item) => {
            if (item._id === res.data._id) {
              return res.data;
            }

            return item;
          });

          dispatch(editEmployee(tempSortedEmployee));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};

export const deleteEmployee = (employeeId) => {
  return {
    type: types.DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

export const deleteEmployeeAsync = (employeeId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/employee/delete/${employeeId}`)
      .then(() => {
        dispatch(deleteEmployee(employeeId));
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };
};
