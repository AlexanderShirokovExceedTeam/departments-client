import axios from "axios";
import { types } from "../types/employeeActionTypes";
import { IDepartment, IEmployee } from "../../types"

export const getEmployees = (employees: any) => {
  return {
    type: types.GET_EMPLOYEES,
    payload: employees,
  };
};

export const getEmployeesAsync = (currentDepartment: string) => {
  return (dispatch: Function) => {
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

export const createEmployee = (newEmployee: IEmployee) => {
  return {
    type: types.ADD_EMPLOYEE,
    payload: newEmployee,
  };
};

export const createEmployeeAsync = (newEmployee: IEmployee) => {
  return (dispatch: Function) => {
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

export const editEmployee = (employee: IEmployee) => {
  return {
    type: types.EDIT_EMPLOYEE,
    payload: employee,
  };
};

export const editEmployeeAsync = (employee: IEmployee, employees: any) => {
  return (dispatch: Function) => {
    axios
      .patch(`http://localhost:8000/employee/edit/${employee._id}`, employee)
      .then((res) => {
        if (res) {
          const tempSortedEmployee = employees.map((item: IEmployee) => {
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

export const deleteEmployee = (employeeId: string) => {
  return {
    type: types.DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

export const deleteEmployeeAsync = (employeeId: any) => {
  return (dispatch: Function) => {
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
