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
          // setSortedEmployee(res.data.data);
          dispatch(getEmployees(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        // setSnackmessage("Can not load employee");
        // setSnackbarOpen(true);
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
          // setSortedEmployee([...sortedEmployee, res.data.data]);
          dispatch(createEmployee(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        // setSnackmessage("Add employee error. Fill all required fields.");
        // setSnackbarOpen(true);
      });
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
